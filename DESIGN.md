# DESIGN.md

## Idea

Il sito presenta prima di tutto un **AI engineer in azienda** (Accenture); il dottorato è il retroterra che ne dimostra la
profondità. Il mondo visivo resta quello della **tavola anatomica / figura scientifica**: bianco freddo, inchiostro blu
venoso, rosso arterioso come unico accento, secondo la convenzione anatomica (arterie rosse, vene blu).

- Elemento forte della home: la scena 3D **"Recupero in uno spazio di embedding"** (`EmbeddingHero.astro`, dati in
  `src/lib/embedding.ts`). Il **blu è il corpus** (documenti raggruppati per argomento, collegati ai vicini più prossimi come
  in un indice vettoriale), il **rosso è il recupero** (una query percorre il grafo e si collega ai sei documenti più
  vicini). È un'illustrazione onesta: dati sintetici, ma k-NN e ricerca sul grafo veri; la didascalia dice "Illustrazione".
- Il **Circolo di Willis come grafo 3D** (`WillisGraph.astro`) è il retroterra di ricerca: blocco "Dal dottorato" in home e
  testata della pagina Ricerca. Al massimo una volta per pagina.
- Il resto è sobrio: testo breve, liste con colonna dell'anno, figure dei paper su "lastra" bianca con didascalia "Fig. N".

## Token (`src/styles/global.css`)

| Ruolo | Chiaro | Scuro |
| --- | --- | --- |
| `--plate` sfondo | `#f5f6f8` | `#0b0f17` |
| `--surface` lastre | `#ffffff` | `#121927` |
| `--ink` testo | `#13213c` (blu venoso) | `#e8ecf3` |
| `--graphite` testo secondario | `#4a5467` | `#a7b0c0` |
| `--rule` filetti | `#d6dbe3` | `#2a3245` |
| `--artery` unico accento | `#b42318` | `#ff7b6c` |
| `--vein` link/focus, corpus della scena | `#24539e` | `#94b8f4` |

Il rosso si usa solo per: vasi del grafo, recupero nella scena, sottolineatura in hover, voce di menu attiva, nodi e rami
"lavoro" della timeline, marker degli elenchi, tag. Mai per il testo corrente. Il blu marca anche la "formazione" nella
timeline (sempre con legenda: il colore non è mai l'unico segnale).

## Tipografia

- Titoli: **Source Serif 4** (variabile, optical size), peso 600, tracking −0.015/−0.025em.
- Testo e UI: **Source Sans 3** (variabile). Corpo 17px, interlinea 1.6, misura max 68ch.
- Numeri (anni) in `tabular-nums`.
- Scala fluida `--step--1 … --step-4`. Nessun maiuscoletto/ALL CAPS per etichette.

## Layout

- Contenitore 74rem, gutter fluido. Allineamento a sinistra.
- **Home**: hero (testo 5.4fr | scena 6.6fr, la scena sborda nel gutter destro) → "Di cosa mi occupo oggi" (tre aree con
  chip degli strumenti) → "Dal dottorato" (Willis 22rem accanto a un elenco semplice di 3 progetti) → contatti.
  Sotto 52rem: testo e pulsanti, poi la scena a tutta larghezza, poi i loghi delle organizzazioni.
- **Esperienza**: un solo "vaso" (`VesselStop.astro`): tronco rosso dal più recente alla radice (laurea triennale), rami
  per i periodi paralleli (dottorato come titolo, laurea magistrale). Una riga per tappa; i dettagli in un `<details>`
  ("Dettagli", Accenture aperto). Da 64rem a destra un marchio fisso (logo e anni della tappa al centro dello schermo).
  Competenze come righe di chip con il logo dello strumento; riconoscimenti come righe `anno · titolo · dettaglio`.
- **Interventi**: griglia di copertine (3 / 2 / 1 colonne). È l'**unica griglia di card** del sito, ammessa perché ogni
  card mostra un contenuto reale (la prima slide). In Ricerca le stesse card in una fila scorrevole (`TalkRail.astro`).
- Liste: griglia `5.5rem | 1fr` (anno | contenuto), su mobile una colonna.
- Progetti: 5/7 (testo | figura), su schermi < 60rem una colonna.
- Breakpoint principali: 40rem, 48rem (menu), 52rem, 60rem, 64rem (marchio della timeline).

## Componenti

- Bottoni: pillola, min-height 44px; primario = inchiostro pieno, secondario = superficie con filetto.
- Link: sottolineati sempre (blu tenue), in hover rosso arterioso 2px. Su touch e < 40rem ogni link isolato è alto 44px.
- Focus: outline 2px `--vein`, offset 3px.
- Header sticky con blur leggero: Home · Esperienza · Ricerca. Su mobile il menu è un pannello sotto l'header (Esc e tap
  fuori chiudono); senza JavaScript la navigazione è una riga semplice sotto il nome. Interventi è raggiungibile da Ricerca
  e dal footer.
- `.scene-pause` (`ScenePause.astro`): pulsante rotondo 44×44, filetto `--rule`, fondo `--plate`, icone pausa/play; in basso
  a destra di ogni scena che si ripete, allineato alla didascalia. Etichetta "Metti in pausa l'animazione" / "Riprendi
  l'animazione". Visibile solo se il movimento è consentito.
- Chip degli strumenti (`TechLogo.astro`): logo come sagoma monocromatica (maschera CSS, `currentColor`), colore del marchio
  al passaggio del mouse; il testo del chip nomina lo strumento, il logo è decorativo. Il primo gruppo è pieno (inchiostro).
- Loghi delle organizzazioni (`Logo.astro`): stessa tecnica; mai a muro, al massimo una riga nella hero e uno alla volta
  nel marchio della timeline.
- Card di gruppo "Seminari e journal club": tre copertine a ventaglio (solo i deck con lavoro di Daniele; mai le
  copertine dei journal club) che si aprono al passaggio del mouse, e tutti i link dietro un `<details>`. Se una copertina
  manca, tre fogli semplici con il titolo. Le copertine bianche sono leggermente attenuate nel tema scuro.
- `.disclosure` (in `global.css`): il `<details>` condiviso da Esperienza e card di gruppo (summary 44px, freccia,
  apertura animata in Chromium).
- Dialog di anteprima delle slide (solo pagina Interventi): copertina locale, "Apri su Google Slides" come azione
  principale, avviso privacy subito sopra "Carica le slide da Google", stato di caricamento e alternativa dopo 8 secondi.

## Movimento

Regole (valgono per tutto):

1. Il movimento continuo usa solo `transform`/`opacity`. Scritture di attributi SVG solo nelle due scene rAF, raggruppate
   (≤ 16 scritture per frame, saltate se il valore non cambia).
2. rAF solo mentre l'elemento è visibile **e** la scheda è in primo piano (IntersectionObserver + `visibilitychange`).
3. Tutto ciò che si ripete per più di 5 secondi ha un **pulsante di pausa** (WCAG 2.2.2).
4. `prefers-reduced-motion: reduce` mostra un fotogramma statico e significativo: riempimenti completi, nessuna transizione
   di vista, details istantanei, nessun pulsante di pausa. Il trascinamento delle scene funziona comunque.
5. Progressive enhancement: nessun contenuto resta nascosto senza JavaScript o senza `animation-timeline`. Gli stati "in
   attesa" valgono solo sotto `:root.js` (classe messa dallo script inline in `<head>`), con un fail-safe CSS di 3 secondi.
6. Easing: entrata `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`); uscita `ease-in` a circa il 60% della durata di entrata;
   UI 160–220ms; momenti delle scene 300–600ms.

Inventario:

- **Hero, testo**: nome a maschera e righe in dissolvenza con sfocatura, sfalsate di 110ms (`.enter`, `.enter-mask`).
- **Hero, scena embedding**: entrata dopo il testo (punti lontani → vicini a 550/670/790ms, corpus da 96% a 100%, archi a
  900ms, prima query a 1.4s); ciclo di 5.2s per query (query e alone, cammino sul grafo a 180ms per salto, ventaglio dei
  6 vicini con 70ms di sfasamento, dissolvenza); rotazione lenta (0.07 rad/s), parallasse col puntatore fine, trascinamento.
  Pausa. Su touch 30 fps. Scuro: leggero bagliore solo sul recupero.
- **Willis**: si disegna la prima volta che è visibile al 30% (flusso: basilare e carotidi → anello → rami), poi oscilla e
  il "flusso" scorre nei vasi (solo con JS). Pausa. Etichette leggibili sotto 30rem, nascoste sotto 20rem.
- **Rivelazioni allo scroll** (CSS, `animation-timeline: view()`): `.reveal`, `.reveal-clip`, `.reveal-rule`,
  `.reveal-stagger`.
- **Rivelazioni a tempo** (`src/scripts/reveal.ts`, attributo `data-reveal`): chip delle competenze (22ms), riconoscimenti
  (60ms), card dei talk (entrata da destra, 50ms), nodi della timeline.
- **Esperienza**: il tronco si riempie di rosso con lo scroll; i rami si disegnano entrando nello schermo; ogni nodo si
  accende (anello colorato in 200ms, poi un impulso unico di 600ms); il marchio fisso cambia logo con dissolvenza (420ms
  entrata, 200ms uscita); i details si aprono in altezza (320ms, Chromium) con i punti sfalsati, freccia ruotata in 220ms.
- **Talk**: inclinazione 3D leggera col puntatore fine (±4°/±6°, ritorno 300ms), ombra in dissolvenza, pressione 0.98;
  apertura del dialog con transizione di vista (la copertina diventa il poster, 320ms) o dissolvenza con scala 0.96→1;
  barra di caricamento indeterminata.
- **Menu mobile**: il pannello scende in 220ms, le voci sfalsate di 40ms.

## Da non fare

Emoji, eyebrow sopra i titoli, numerazioni 01/02/03 decorative, griglie di card identiche fuori dalla pagina Interventi,
contatori/statistiche, gradienti nel testo, glassmorphism decorativo, foto stock, illustrazioni generate, loghi a muro,
iframe che si caricano da soli, loop senza pausa, animazioni che nascondono contenuto senza JavaScript.
