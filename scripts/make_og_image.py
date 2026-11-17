"""Generate public/og-image.png (1200x630), the preview shown when the site is
shared on LinkedIn, WhatsApp, Slack and similar.

It reuses the live home page: the hero text and the embedding-space figure
(static frame, reduced motion) are re-laid out in a 1200x630 frame and
screenshotted. Re-run after changing the name, role, tagline or figure.

Usage (dev server running):
    .venv/Scripts/python scripts/make_og_image.py [--base http://localhost:4321/danielefalcetta/]
"""
import argparse
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent

FRAME_CSS = """
  html, body { margin: 0 !important; width: 1200px; height: 630px; overflow: hidden; }
  .site-header, .site-footer, .skip-link, main > section:not(.hero), .hero .actions,
  .emb figcaption, .scene-pause, .affiliations { display: none !important; }
  main { display: block; }
  .hero { padding: 0 !important; height: 630px; min-height: 0 !important; display: grid; align-items: center; }
  .hero .wrap { max-width: none; padding-inline: 72px; }
  .hero__grid { grid-template-columns: 1.15fr 0.85fr !important; grid-template-areas: 'text fig' !important; gap: 24px !important; }
  .hero h1 { font-size: 76px !important; }
  .hero__role { font-size: 32px !important; max-width: 22ch !important; }
  .hero__tagline { font-size: 22px !important; max-width: 34ch !important; margin-top: 24px !important; }
  .hero__figure { max-width: 520px !important; margin: 0 !important; align-self: center !important; }
  body::after { content: '2falx.github.io/danielefalcetta'; position: fixed; left: 72px; bottom: 40px;
    font: 600 18px/1 'Source Sans 3 Variable', sans-serif; color: var(--graphite); }
  body::before { content: ''; position: fixed; inset: 0 0 auto 0; height: 10px; background: var(--artery); }
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='http://localhost:4321/danielefalcetta/')
    args = ap.parse_args()
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={'width': 1200, 'height': 630}, reduced_motion='reduce', color_scheme='light')
        page.goto(args.base, wait_until='networkidle')
        page.add_style_tag(content=FRAME_CSS)
        page.wait_for_timeout(300)
        out = ROOT / 'public' / 'og-image.png'
        page.screenshot(path=str(out))
        browser.close()
    print(f'wrote {out}')


if __name__ == '__main__':
    main()
