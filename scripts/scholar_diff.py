"""List Google Scholar publications that are not yet on the site.

Downloads the public Scholar profile (sorted by date) with curl — Python's
HTTP stack fails on the corporate SSL proxy — and compares the titles with the
publications in src/data/research.ts. Items already handled in another way
(preprints of a published paper, talks, duplicates) are listed with a reason in
scripts/scholar_ignore.json and are not reported again.

Scholar's per-paper pages answer automated clients with a "Verifying..." page,
so this script only reads the profile list; take authors, venue and links from
the DOI / arXiv / medRxiv / proceedings (see the scholar-sync skill).

Usage (repo root):
    .venv/Scripts/python scripts/scholar_diff.py [--user 4LHNCl0AAAAJ]
"""
from __future__ import annotations

import argparse
import difflib
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESEARCH = ROOT / 'src' / 'data' / 'research.ts'
IGNORE = ROOT / 'scripts' / 'scholar_ignore.json'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'


def norm(title: str) -> str:
    return re.sub(r'[^a-z0-9]+', ' ', html.unescape(title).lower()).strip()


def fetch_profile(user: str) -> list[dict]:
    rows: list[dict] = []
    start = 0
    while True:
        url = (
            f'https://scholar.google.com/citations?user={user}&hl=en&view_op=list_works'
            f'&sortby=pubdate&cstart={start}&pagesize=100'
        )
        page = subprocess.run(
            ['curl', '-sL', '--max-time', '60', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
            capture_output=True, text=True, encoding='utf-8', check=True,
        ).stdout
        if 'gsc_a_tr' not in page:
            if not rows:
                sys.exit('Could not read the Scholar profile (blocked or changed). Try again later or check the URL in a browser.')
            break
        found = re.findall(r'<tr class="gsc_a_tr">(.*?)</tr>', page, re.S)
        for r in found:
            t = re.search(r'class="gsc_a_at">(.*?)</a>', r, re.S)
            cid = re.search(r'citation_for_view=[^:]+:([^"&]+)', r)
            grays = [html.unescape(re.sub('<[^>]+>', '', g)).strip() for g in re.findall(r'<div class="gs_gray">(.*?)</div>', r, re.S)]
            year = re.search(r'gsc_a_h gsc_a_hc gs_ibl">(\d*)<', r)
            rows.append({
                'title': html.unescape(t.group(1)).strip() if t else '?',
                'id': cid.group(1) if cid else '',
                'authors': grays[0] if grays else '',
                'venue': grays[1] if len(grays) > 1 else '',
                'year': year.group(1) if year else '',
            })
        if len(found) < 100:
            break
        start += 100
    return rows


def site_titles() -> list[str]:
    src = RESEARCH.read_text(encoding='utf-8')
    block = src[src.index('export const publications'):]
    block = block[: block.index('\n];')]
    return [m.replace("\\'", "'") for m in re.findall(r"title:\s*'((?:[^'\\]|\\.)*)'", block)]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--user', default='4LHNCl0AAAAJ')
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')

    ignore = json.loads(IGNORE.read_text(encoding='utf-8')) if IGNORE.exists() else []
    ignored = {norm(i['title']): i['reason'] for i in ignore}
    on_site = {norm(t): t for t in site_titles()}

    missing, skipped = [], []
    for item in fetch_profile(args.user):
        key = norm(item['title'])
        if key in ignored:
            skipped.append((item, ignored[key]))
            continue
        best = max(on_site, key=lambda s: difflib.SequenceMatcher(None, key, s).ratio(), default='')
        score = difflib.SequenceMatcher(None, key, best).ratio() if best else 0
        if score < 0.85:
            missing.append((item, on_site.get(best, ''), score))

    print(f'Scholar items not on the site: {len(missing)}')
    for item, closest, score in missing:
        print(f"\n- {item['title']}  [{item['year'] or 'no year'}]")
        print(f"  authors: {item['authors']}")
        print(f"  venue:   {item['venue'] or '(none on Scholar)'}")
        print(f"  scholar: https://scholar.google.com/citations?view_op=view_citation&user={args.user}&citation_for_view={args.user}:{item['id']}")
        if closest and score > 0.5:
            print(f'  closest on site ({score:.2f}): {closest}')
    if skipped:
        print(f'\nIgnored (scripts/scholar_ignore.json): {len(skipped)}')
        for item, reason in skipped:
            print(f"  - {item['title'][:80]}  -> {reason}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
