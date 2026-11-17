# CLAUDE.md

Sito personale di Daniele Falcetta (AI Engineer in Accenture, PhD in deep learning per imaging medico).
Pubblicato su GitHub Pages: https://2falx.github.io/danielefalcetta/ (EN alla radice, IT sotto `/it/`).

## Stack e comandi

- **Astro 7**, output statico, zero framework UI. TypeScript strict. Node ≥ 22.23 (in uso: 24).
- Font self-hosted via `@fontsource-variable` (Source Serif 4 + Source Sans 3, le stesse famiglie del CV in LaTeX).
- Python solo per i controlli: venv gestito con **uv** in `.venv/` (Playwright + axe + Pillow + rembg).

```bash
npm install                 # dipendenze sito
npm run dev                 # http://localhost:4321/danielefalcetta/  (hot reload)
npm run build               # build statica in dist/
npm run preview             # serve dist/ su :4321 per verificare la build reale
uv venv .venv --python 3.12 && uv pip install --python .venv playwright axe-playwright-python pillow "rembg[cpu]"
.venv/Scripts/python -m playwright install chromium
.venv/Scripts/python scripts/check_site.py        # verifica (vedi sotto); richiede dev o preview attivo
.venv/Scripts/python scripts/check_site.py --motion --no-shots   # stessa verifica con le animazioni attive
.venv/Scripts/python scripts/make_og_image.py     # rigenera public/og-image.png
.venv/Scripts/python scripts/make_talk_covers.py  # copertine dei talk da Google Slides (solo in sviluppo, poi commit)
npx skills experimental_install                   # ripristina le skill di terze parti da skills-lock.json
```

Rete aziendale: il proxy fa ispezione SSL, Python/requests può fallire con `CERTIFICATE_VERIFY_FAILED`.
Non disattivare la verifica SSL: scarica i file con `curl` (usa l'archivio certificati di Windows).

## Struttura

- `src/data/*.ts` – **tutti i contenuti**, bilingui (`{ en, it }`). Qui si modificano testi, pubblicazioni, talk, esperienze.
  - `profile.ts` identità, link, intro, "di cosa mi occupo oggi", competenze (con il logo dello strumento, se c'è)
  - `research.ts` progetti (con figure) e pubblicazioni
  - `career.ts` il "vaso" dell'Esperienza (tappe di lavoro e formazione, rami per i periodi paralleli) e i riconoscimenti
  - `talks.ts` interventi (slug, ID dei deck Google Slides; il gruppo "seminari" raccoglie più deck)
- `src/i18n/ui.ts` – stringhe dell'interfaccia, helper `t()`, `pick()`, `route()`, `asset()`, `enIfSame()` (mette `lang="en"` sui titoli rimasti in inglese nelle pagine IT).
- `src/views/*.astro` – una vista per pagina, parametrizzata da `lang`. `src/pages/` e `src/pages/it/` sono solo wrapper.
- `src/components/`
  - `Header`, `Footer` (il footer ha anche i link alle pagine, compreso Interventi)
  - `EmbeddingHero` – la scena 3D della home ("recupero in uno spazio di embedding")
  - `WillisGraph` – il Circolo di Willis come grafo 3D (home, blocco "Dal dottorato", e testata di Ricerca; una volta per pagina)
  - `ScenePause` – pulsante pausa/play delle scene che si ripetono
  - `VesselStop` – una tappa del vaso dell'Esperienza (ricorsiva per i rami)
  - `TalkRail` – card dei talk con copertina (griglia in Interventi, fila scorrevole in Ricerca)
  - `Logo` (organizzazioni), `TechLogo` (framework e strumenti), `Icon`
- `src/lib/` – `willis.ts` (geometria del Circolo di Willis), `embedding.ts` (dati sintetici, grafo k-NN, ricerca e proiezione della scena; condivisi server/client), `scene-pause.ts` (logica del pulsante di pausa).
- `src/scripts/reveal.ts` – rivelazioni a tempo (`data-reveal`), caricato una volta dal layout.
- `src/styles/global.css` – token di design e stili base. Vedi `DESIGN.md`.
- `src/assets/` – immagini ottimizzate da Astro: ritratto, figure dei paper, `logos/` (organizzazioni) e `logos/tech/` (strumenti, metadati in `simple-icons.json`), `talks/` (copertine dei talk, generate da `make_talk_covers.py` e committate). `public/` – file serviti così come sono (CV, favicon, og-image).
- `scripts/` – `check_site.py` (verifica nel browser; `--motion` per le animazioni attive; controlla anche i target tattili su mobile), `make_og_image.py`, `make_talk_covers.py` (solo in sviluppo, mai in CI).

## Regole sui contenuti (obbligatorie)

1. **Non inventare nulla.** Ogni affermazione deve venire da una fonte: CV (`Daniele_Falcetta_AI_Engineer_CV.tex`, cartella `OneDrive - Accenture/Documents/PROGETTI/`), il report sul profilo LinkedIn nella stessa cartella, i paper pubblicati, o l'utente. Se manca un dato, chiedi o lascia fuori; non riempire con testo plausibile.
2. **Niente promesse non dimostrabili.** Vietati superlativi e numeri senza fonte ("SOTA", "top 1%", "drasticamente", "tra i migliori al mondo"). Una percentuale entra solo se è nel CV o in un paper, e va segnalata all'utente da verificare.
3. **Riservatezza Accenture.** Non pubblicare nomi di clienti, nomi interni di progetti/repository, endpoint, metriche su dati interni. Usa solo le formulazioni generiche già nel CV (es. "vehicle damage estimation", "enterprise application search"). I file `CLAUDE_*.md` nella cartella PROGETTI sono documentazione interna di progetti cliente: **non usarli come fonte per il sito**.
4. **Bilingue sempre.** Ogni testo nuovo va in `en` e `it`, con lo stesso significato (niente "con lode" se l'inglese non dice "with honours").
5. **Niente emoji** nei contenuti e nell'interfaccia. Icone solo come SVG disegnati.
6. Il proprio nome negli autori delle pubblicazioni viene evidenziato automaticamente (`D. Falcetta`).
7. **Posizionamento solo aziendale.** Il sito presenta un AI engineer / consulente in azienda; il dottorato e la ricerca sono
   retroterra passato, compatto. Niente segnali di disponibilità per posizioni accademiche, collaborazioni di ricerca o
   consulenze. Navigazione principale: Home · Esperienza · Ricerca; Interventi resta online ma si raggiunge da Ricerca e dal footer.
8. **Loghi degli strumenti solo se nel CV.** Nelle competenze e nei chip compaiono solo strumenti presenti nel CV
   (`Daniele_Falcetta_AI_Engineer_CV.tex` o `General.tex`). OpenCV, MONAI, VTK, nibabel, SimpleITK non ci sono: restano fuori.
9. Le cifre del lavoro di ricerca seguono il paper, non il CV: per l'active learning one-shot "si avvicina alle prestazioni
   del modello completamente supervisionato usando solo il 30% delle etichette" (MICCAI 2025, paper 2457); non "70%".

## Regole privacy e legali (obbligatorie)

Lo stato attuale, garantito dal codice e dichiarato in `src/views/Privacy.astro`: **nessun cookie, nessuna statistica, nessun modulo, nessuna risorsa di terze parti al caricamento.**

- Non aggiungere analytics, pixel, widget, font o script da CDN senza: (a) valutare se serve il consenso (banner), (b) aggiornare l'informativa in EN e IT, (c) dirlo esplicitamente all'utente.
- Contenuti esterni (Google Slides, video, mappe) solo **click-to-load**, con avviso prima del click. Mai iframe che si caricano da soli.
- Nessun modulo di contatto: si usa `mailto:`. Se un giorno serve un modulo: solo i campi necessari, informativa accanto al pulsante, nessuna casella pre-spuntata.
- Niente numero di telefono né indirizzo sul sito (minimizzazione).
- Immagini: rimuovi i metadati EXIF/GPS prima di pubblicarle (la pipeline di Astro li toglie dalle immagini in `src/assets/`; i file in `public/` vanno puliti a mano).
- L'utente è una persona fisica senza Partita IVA né iscrizione ad albi: **non** aggiungere P.IVA, REA, albo o "note legali" aziendali. Se cambia (es. apre P.IVA per consulenze), va aggiornato il footer e rifatto il controllo pre-pubblicazione.
- Prima di ogni pubblicazione: skill `prepublish-check`.

## Accessibilità e responsive (obbligatorie)

- Obiettivo **WCAG 2.2 AA**: contrasto ≥ 4.5:1 (testo) e ≥ 3:1 (testo grande/UI), focus visibile, tutto usabile da tastiera, `alt` che descrive cosa mostra davvero l'immagine (guardala prima di scriverlo), link e bottoni con testo chiaro, `lang` corretto, `prefers-reduced-motion` rispettato.
- Ogni modifica va verificata su **desktop (1440×900) e smartphone (390×844)**, in tema chiaro e scuro: `scripts/check_site.py` fa screenshot, axe, overflow orizzontale, errori console e richieste a terze parti. Deve finire con 0 problemi.
- Target tattili ≥ 44px su mobile (anche i link negli elenchi; `check_site.py` lo controlla).
- Ogni animazione che si ripete per più di 5 secondi ha un **pulsante di pausa** (`ScenePause`, WCAG 2.2.2); con
  `prefers-reduced-motion` la scena è ferma e il pulsante non compare. Senza JavaScript nessun contenuto resta nascosto
  e la navigazione funziona anche su mobile.

## Design

Leggi `DESIGN.md` prima di toccare la UI. In breve: "tavola anatomica" (bianco freddo, inchiostro blu venoso, rosso
arterioso come unico accento). In home l'elemento forte è la scena 3D dello spazio di embedding (blu il corpus, rosso il
recupero); il Circolo di Willis è il retroterra di ricerca. Movimento sì, ma con regole: solo `transform`/`opacity` per il
movimento continuo, rAF solo quando visibile, pausa sui loop, fotogramma statico con `reduced-motion`. Il resto è sobrio:
liste e figure con didascalia, l'unica griglia di card è quella delle copertine in Interventi, niente eyebrow, niente
contatori, niente gradienti decorativi, niente loghi a muro.

## Skill e MCP disponibili

Skill di progetto (scritte per questo sito):
- `prepublish-check` – controllo privacy/cookie/accessibilità/contenuti/diritti prima di pubblicare.
- `site-content` – aggiornare contenuti da CV/LinkedIn (esperienze, pubblicazioni, talk).
- `scholar-sync` – aggiungere le pubblicazioni nuove dal profilo Google Scholar, verificate alla fonte
  (`scripts/scholar_diff.py` trova quelle mancanti; `scripts/scholar_ignore.json` elenca i duplicati gestiti).

Skill installate da GitHub (vedi `skills-lock.json`): `frontend-design`, `impeccable`, `design-taste-frontend`, `ui-ux-pro-max`,
`web-design-guidelines`, `writing-guidelines`, `emil-design-eng`, `animate`, `review-animations`, `animation-performance`, `mobile-native`,
`accessibility`, `best-practices`, `core-web-vitals`, `performance`, `seo`, `web-quality-audit`, `webapp-testing`.
Quando ne usi una, le regole di questo file hanno la precedenza (es. `design-taste-frontend` suggerisce foto stock: qui no).

MCP in `.mcp.json`: `playwright` (navigare e testare il sito) e `chrome-devtools` (performance, rete, Lighthouse).

## Deploy

- Push su `main` → GitHub Actions (`.github/workflows/deploy.yml`) builda e pubblica.
- In GitHub → Settings → Pages, la sorgente deve essere **"GitHub Actions"** (non "Deploy from a branch").
- Non fare commit o push senza che l'utente lo chieda.
