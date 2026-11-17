# Daniele Falcetta – personal website

Source of [2falx.github.io/danielefalcetta](https://2falx.github.io/danielefalcetta/): AI engineering at Accenture, PhD research on
3D brain-vessel segmentation, publications and talks. English at the root, Italian under `/it/`.

## Built with

- [Astro](https://astro.build) (static output, no UI framework), TypeScript
- Self-hosted fonts: Source Serif 4 and Source Sans 3
- A small hand-written 3D projector for the Circle of Willis figure (`src/lib/willis.ts`), no WebGL library
- No cookies, no analytics, no third-party requests on page load

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/danielefalcetta/
npm run build      # static site in dist/
npm run preview    # serve the production build
```

Checks (Python via [uv](https://docs.astral.sh/uv/)):

```bash
uv venv .venv --python 3.12
uv pip install --python .venv playwright axe-playwright-python pillow
.venv/Scripts/python -m playwright install chromium
.venv/Scripts/python scripts/check_site.py   # accessibility (axe, WCAG 2.2 AA), overflow, console errors,
                                             # third-party requests, screenshots: desktop + mobile, light + dark
```

## Content

All text lives in `src/data/` in both languages. See `CLAUDE.md` for the content, privacy and accessibility rules,
and `DESIGN.md` for the visual system.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, Pages → Source must be set to **GitHub Actions**.

## License

Code: MIT. Text, photographs and figures: © Daniele Falcetta, all rights reserved.
