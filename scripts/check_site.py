"""Render every page in a real browser and check it.

For each page and viewport (desktop 1440x900, mobile 390x844) and colour
scheme (light, dark) it:
  * saves a full-page screenshot to .screenshots/
  * records console errors and failed requests
  * records requests to third-party hosts (should be none before a click)
  * checks for horizontal overflow (content wider than the viewport)
  * runs axe-core (WCAG 2.2 A/AA rules) and lists violations
  * on mobile, checks that every visible link, button and summary is at least
    44px tall (CLAUDE.md touch-target rule; inline links in running text are
    exempt, as in WCAG 2.5.8)

By default the browser asks for reduced motion, so pages are checked in their
static state. --motion checks them with animations running instead
(screenshots get a .motion suffix). Before measuring, the motion run waits up
to 4s for finite time-based animations (entrances) and then cancels the
scroll-driven ones (`animation-timeline: view()` reveals, the vessel fill):
their state depends only on the scroll position, so the motion run does not
cover them. Looping animations keep running.

Usage (from the repo root, with the dev server or `npm run preview` running):
    .venv/Scripts/python scripts/check_site.py [--base http://localhost:4321/danielefalcetta/] [--no-shots] [--motion]

Exit code 1 if anything fails.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
AXE = ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'
SHOTS = ROOT / '.screenshots'

PAGES = ['', 'research/', 'talks/', 'experience/', 'privacy/', 'it/', 'it/research/', 'it/talks/', 'it/experience/', 'it/privacy/']
VIEWPORTS = {'desktop': {'width': 1440, 'height': 900}, 'mobile': {'width': 390, 'height': 844}}

# Visible links, buttons and summaries smaller than 44x44px (43.5 allows for rounding).
# Exempt: the skip link (off-screen until focused), inline links inside running
# text (WCAG 2.5.8 inline exception) and visually hidden elements. An inline link
# that is the only content of its block (e.g. a list item) is not exempt.
# Settled state for --motion: wait (max 4s) for finite time-based animations
# (entrances), then drop the scroll-driven reveals, whose state depends only on
# where the page happens to be scrolled (an element sitting at the bottom edge
# is half-faded by design). Looping animations keep running.
SETTLE_JS = """async () => {
  await Promise.race([
    Promise.all(document.getAnimations()
      .filter((a) => a.timeline instanceof DocumentTimeline && a.effect && a.effect.getTiming().iterations !== Infinity)
      .map((a) => a.finished.catch(() => null))),
    new Promise((r) => setTimeout(r, 4000)),
  ]);
  document.getAnimations()
    .filter((a) => a.timeline && !(a.timeline instanceof DocumentTimeline))
    .forEach((a) => a.cancel());
}"""

SMALL_TARGETS_JS = r"""() => {
  const out = [];
  for (const el of document.querySelectorAll('a, button, summary')) {
    if (el.matches('.skip-link')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible') continue;
    if (cs.display === 'inline') {
      // Exempt only when the link sits in running text (other words in the same block).
      let block = el.parentElement;
      while (block && getComputedStyle(block).display === 'inline') block = block.parentElement;
      const own = (el.textContent || '').trim();
      const all = (block?.textContent || '').trim();
      if (all.length > own.length + 3) continue;
    }
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) continue;
    if (el.closest('[hidden], details:not([open]) > :not(summary)')) continue;
    if (r.height < 43.5 || r.width < 43.5) {
      const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''} "${label}" ${r.width.toFixed(0)}x${r.height.toFixed(0)}px`);
    }
  }
  return out;
}"""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='http://localhost:4321/danielefalcetta/')
    ap.add_argument('--no-shots', action='store_true')
    ap.add_argument('--pages', nargs='*', default=None)
    ap.add_argument('--motion', action='store_true', help='check with animations running (no reduced motion)')
    args = ap.parse_args()

    sys.stdout.reconfigure(encoding='utf-8')
    SHOTS.mkdir(exist_ok=True)
    base_host = urlparse(args.base).netloc
    axe_src = AXE.read_text(encoding='utf-8')
    failures = 0

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for vp_name, vp in VIEWPORTS.items():
            for scheme in ('light', 'dark'):
                ctx = browser.new_context(
                    viewport=vp,
                    color_scheme=scheme,
                    device_scale_factor=2 if vp_name == 'mobile' else 1,
                    is_mobile=vp_name == 'mobile',
                    has_touch=vp_name == 'mobile',
                    reduced_motion='no-preference' if args.motion else 'reduce',
                )
                for path in args.pages or PAGES:
                    page = ctx.new_page()
                    errors: list[str] = []
                    external: set[str] = set()
                    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('requestfailed', lambda r: errors.append(f'request failed: {r.url}'))
                    page.on(
                        'request',
                        lambda r: external.add(urlparse(r.url).netloc)
                        if urlparse(r.url).netloc not in (base_host, '') and not r.url.startswith('data:')
                        else None,
                    )
                    url = urljoin(args.base, path)
                    resp = page.goto(url, wait_until='networkidle')
                    status = resp.status if resp else 0
                    if args.motion:
                        # Check the settled page (see SETTLE_JS).
                        page.evaluate(SETTLE_JS)
                    # Compare with the configured width: on mobile, wide content makes the
                    # browser zoom out, which also widens innerWidth and would hide it.
                    overflow = page.evaluate('document.documentElement.scrollWidth') - vp['width']
                    page.add_script_tag(content=axe_src)
                    result = page.evaluate(
                        "async () => await axe.run(document, {runOnly: {type: 'tag', values: "
                        "['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})"
                    )
                    violations = [
                        f"{v['id']} ({v['impact']}): {v['help']} -> {len(v['nodes'])} node(s): "
                        + '; '.join(n['target'][0] if isinstance(n['target'][0], str) else json.dumps(n['target']) for n in v['nodes'][:4])
                        for v in result['violations']
                    ]
                    tag = f"{vp_name:7} {scheme:5} /{path}"
                    problems = []
                    if status != 200:
                        problems.append(f'HTTP {status}')
                    if overflow > 0:
                        problems.append(f'horizontal overflow {overflow}px')
                    if errors:
                        problems.append('console: ' + ' | '.join(errors[:5]))
                    if external:
                        problems.append('third-party hosts contacted: ' + ', '.join(sorted(external)))
                    problems += violations
                    if vp_name == 'mobile':
                        small = page.evaluate(SMALL_TARGETS_JS)
                        if small:
                            problems.append(f'{len(small)} touch target(s) under 44x44px: ' + '; '.join(small[:6]))
                    print(('FAIL ' if problems else 'ok   ') + tag)
                    for p in problems:
                        print('     - ' + p)
                    failures += bool(problems)
                    if not args.no_shots:
                        suffix = '.motion' if args.motion else ''
                        name = (path.strip('/').replace('/', '_') or 'home') + f'.{vp_name}.{scheme}{suffix}.png'
                        page.screenshot(path=str(SHOTS / name), full_page=True)
                    page.close()
                ctx.close()
        browser.close()

    print(f'\n{failures} page/viewport combination(s) with problems. Screenshots in {SHOTS}')
    return 1 if failures else 0


if __name__ == '__main__':
    raise SystemExit(main())
