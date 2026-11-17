"""Capture the first slide of each talk as a local cover image.

The Talks page shows these covers so that no request goes to Google when a
page loads (see CLAUDE.md, privacy rules). Run it on a development machine
when a talk is added, check the images, and commit them. Never run it in CI.

For each top-level talk in src/data/talks.ts that has a single `deck:`, it
opens the public embed in Chromium, waits for the slide, screenshots it, and
saves src/assets/talks/{slug}.jpg: 1200px wide, JPEG quality 85, progressive,
with no metadata. For grouped cards (`decks:`), only the first N decks listed
in GROUP_COVERS are captured, as {slug}-{n}.jpg (n = 1-based): the card shows
them as a fanned stack. Talks in SKIP are never captured.

Usage (from the repo root):
    .venv/Scripts/python scripts/make_talk_covers.py [--force] [--only SLUG ...]

Existing covers are skipped unless --force. Exit code 1 (and the slug is
printed) if a slide cannot be found, e.g. because Google renamed the viewer
markup or the deck is not public.
"""
from __future__ import annotations

import argparse
import io
import re
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import TimeoutError as PlaywrightTimeout
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
TALKS = ROOT / 'src' / 'data' / 'talks.ts'
OUT = ROOT / 'src' / 'assets' / 'talks'
SLIDE = '.punch-viewer-svgpage-svgcontainer'
WIDTH = 1200

# Grouped card -> how many of its decks get a cover. The journal clubs may show
# other authors' papers on their first slide, and two of the three own-work
# seminar title slides use third-party artwork (MICCAI 2025 title art with a
# venue photo; an illustration of unknown origin). So no seminar covers are
# captured: the grouped card shows plain sheets (manager decision, round 1).
GROUP_COVERS: dict[str, int] = {}

# Never capture: the TopCoW title slide contains a photo of unknown source.
SKIP = {'topcow-2023'}


def single_deck_talks() -> list[tuple[str, str]]:
    """(name, deck): each talk's own `deck:`, plus the first decks of grouped cards."""
    src = TALKS.read_text(encoding='utf-8')
    pairs = []
    for m in re.finditer(r"slug:\s*'([^']+)'", src):
        slug = m.group(1)
        rest = src[m.end():]
        nxt = re.search(r"slug:\s*'|deck:\s*'([^']+)'|decks:", rest)
        if not nxt or slug in SKIP:
            continue
        if nxt.group(0).startswith('deck:'):
            pairs.append((slug, nxt.group(1)))
        elif nxt.group(0) == 'decks:' and slug in GROUP_COVERS:
            group = rest[nxt.end():]
            stop = re.search(r"slug:\s*'", group)
            ids = re.findall(r"deck:\s*'([^']+)'", group[: stop.start()] if stop else group)
            pairs += [(f'{slug}-{n}', d) for n, d in enumerate(ids[: GROUP_COVERS[slug]], start=1)]
    return pairs


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--force', action='store_true', help='overwrite existing covers')
    ap.add_argument('--only', nargs='*', default=None, help='slugs to capture')
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    todo = [(s, d) for s, d in single_deck_talks() if not args.only or s in args.only]
    if not todo:
        print('no talks to capture')
        return 0

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_context(viewport={'width': 1600, 'height': 900}).new_page()
        for slug, deck in todo:
            out = OUT / f'{slug}.jpg'
            if out.exists() and not args.force:
                print(f'skip {slug} (exists)')
                continue
            url = f'https://docs.google.com/presentation/d/e/{deck}/embed?start=false&loop=false&delayms=3000&rm=minimal'
            try:
                page.goto(url, wait_until='load', timeout=90_000)
                slide = page.locator(SLIDE).first
                slide.wait_for(state='visible', timeout=90_000)
                page.wait_for_timeout(1500)  # let fonts and images settle
                png = slide.screenshot()
            except PlaywrightTimeout:
                print(f'FAILED {slug}: slide container {SLIDE} not found')
                browser.close()
                return 1
            img = Image.open(io.BytesIO(png)).convert('RGB')
            img = img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)
            img.save(out, 'JPEG', quality=85, progressive=True, optimize=True)
            print(f'wrote {out.relative_to(ROOT)} {img.size[0]}x{img.size[1]}')
        browser.close()
    return 0


if __name__ == '__main__':
    sys.exit(main())
