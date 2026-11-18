---
name: prepublish-check
description: Controllo pre-pubblicazione del sito personale per Italia/UE - privacy e informativa GDPR, cookie e banner, contenuti esterni e statistiche, minimizzazione dei dati, accessibilità (alt, contrasto, tastiera, etichette), affermazioni non dimostrabili, diritti su foto e immagini, riservatezza verso il datore di lavoro, dati professionali obbligatori. Usala prima di ogni push/pubblicazione, quando si aggiungono analytics, moduli, embed, foto o nuovi contenuti, o quando l'utente chiede "posso pubblicare?", "controlla privacy/cookie/GDPR/accessibilità", "pre-publish check".
---

# Controllo pre-pubblicazione

Obiettivo: il sito non deve mettere Daniele nei guai. Controlla, correggi ciò che è certo, e **segnala** tutto ciò che solo lui può verificare.
Regola d'oro: **non inventare nulla**. Né dati (P.IVA, albo, numeri, premi), né norme, né conclusioni legali sicure. Questa skill
non è consulenza legale: dove c'è un dubbio, scrivilo come "da verificare" con il motivo e il riferimento.

Contesto fisso (aggiornalo se cambia): Daniele è una **persona fisica**, dipendente, **senza Partita IVA e senza iscrizione ad albi**.
Il sito è un portfolio personale statico su GitHub Pages, senza vendita di servizi.

## 1. Verifiche automatiche (esegui sempre)

```bash
npm run build                                   # deve finire senza errori
npm run preview &                               # serve dist/ su :4321
.venv/Scripts/python scripts/check_site.py      # axe WCAG 2.2 AA, overflow, console, terze parti, screenshot desktop+mobile chiaro+scuro
```

Poi cerca nel codice sorgente (`src/`, `public/`, `astro.config.mjs`):

| Cerca | Perché | Esito atteso |
|---|---|---|
| `<form`, `<input` | raccolta dati | assenti (si usa `mailto:`) |
| `<iframe` fuori da `Talks.astro` (click-to-load) | contenuti di terze parti al caricamento | assenti |
| `document.cookie`, `localStorage`, `sessionStorage` | strumenti di memorizzazione (ePrivacy art. 5.3) | solo `localStorage('theme')` scritto dopo click |
| URL `https://` in `<script src>`, `<link href>`, `@import`, `url(` | CDN, font, tracker | nessuno |
| `gtag`, `analytics`, `pixel`, `hotjar`, `clarity`, `plausible`, `umami` | statistiche | assenti, oppure informativa e consenso aggiornati |
| numeri di telefono, indirizzi di casa | minimizzazione | assenti |
| "SOTA", "state of the art", "top 1%", "best", "leading", "world-class", "drastically", "unique", "guaranteed", "migliore", "leader", "garantito" | promesse non dimostrabili | assenti o con fonte |
| emoji | richiesta dell'utente | assenti |

Immagini in `public/` (non passano dalla pipeline di Astro): controlla i metadati EXIF/GPS con Pillow e rimuovili.
Il PDF del CV in `public/cv/` è la build pubblica del sorgente LaTeX (`Daniele_Falcetta_AI_Engineer_CV_2026-11.tex` in OneDrive/PROGETTI, interruttore `\publictrue`: bilingue, senza telefono). Verifica con `pdftotext -enc UTF-8 public/cv/Daniele_Falcetta_CV.pdf -` che il numero non ci sia, che il testo non sia duplicato e che le lettere accentate siano intere ("più", "Université"). Se il CV cambia, ricompila la build pubblica (pdfLaTeX, MiKTeX installato per l'utente) invece di oscurare un PDF.

## 2. Cosa controllare e cosa riportare

### Privacy (GDPR, Reg. UE 2016/679; Codice privacy D.Lgs. 196/2003)
- L'informativa (`src/views/Privacy.astro`, EN e IT) descrive **esattamente** ciò che il codice fa: titolare e contatto, hosting, assenza di cookie/statistiche/moduli, `localStorage` per il tema, contenuti esterni solo su click, uso delle email ricevute, diritti, reclamo al Garante. Se il codice è cambiato, aggiorna l'informativa e la data.
- Raccogli solo i dati che servono (art. 5.1.c): niente moduli se basta l'email; se un modulo diventa necessario, solo i campi indispensabili e informativa vicino al pulsante.
- Da far verificare all'utente: cosa dichiara GitHub sul trattamento degli IP dei visitatori di GitHub Pages (pagina "About GitHub Pages" e Privacy Statement) e che il link nell'informativa sia ancora quello giusto.

### Cookie e banner (Direttiva 2002/58/CE art. 5.3; Linee guida del Garante su cookie e altri strumenti di tracciamento, 10 giugno 2021)
- Senza cookie e senza strumenti di tracciamento il banner **non serve**. Strumenti tecnici necessari a un servizio chiesto dall'utente (es. tema scelto) non richiedono consenso.
- Se si aggiungono statistiche o contenuti di terze parti che tracciano: serve valutare consenso e banner. Ricorda le regole note delle linee guida 2021: lo scroll non è consenso; chiudere il banner con la X equivale a rifiutare; nessun cookie non tecnico prima del consenso. Segnala all'utente di rileggere le linee guida prima di introdurre qualsiasi tracciamento.
- Esempio di rischio da citare se qualcuno propone font o script da CDN: la sentenza del Landgericht München I del 20 gennaio 2022 (Google Fonts caricati da server Google senza consenso). Qui i font sono self-hosted.

### Contenuti esterni e statistiche
- Elenca ogni dominio esterno contattato **prima** di un'azione dell'utente: deve essere nessuno (lo verifica `check_site.py`).
- Google Slides: caricate solo dopo "Mostra le slide qui", con avviso visibile prima del click.
- Link esterni: verifica che rispondano (HEAD/GET) e segnala quelli rotti; non sostituirli con URL indovinati.

### Accessibilità (obiettivo WCAG 2.2 AA)
- Per un sito personale non c'è un obbligo di legge specifico (la Legge 4/2004 "Stanca" riguarda PA e grandi aziende; l'European Accessibility Act, recepito con D.Lgs. 82/2022, riguarda specifici prodotti e servizi): trattala comunque come requisito. Non scrivere sul sito che è "conforme WCAG" se non c'è un audit completo.
- Verifica oltre ad axe: testo alternativo che descrive davvero l'immagine (aprila e guardala), contrasto in entrambi i temi, navigazione completa da tastiera (Tab, Shift+Tab, Invio, Esc sul menu), focus visibile, bottoni e link con testo chiaro ("Scarica il CV (PDF)", non "Clicca qui"), `lang` corretto su pagine e frammenti in altra lingua, `prefers-reduced-motion`, zoom al 200% senza perdita di contenuto, target tattili ≥ 44px.

### Contenuti onesti
- Nessuna recensione, testimonianza o citazione di terzi che non sia reale e autorizzata.
- Ogni numero o primato deve avere una fonte (paper, sito della conferenza, CV). Elenca all'utente quelli presenti con la fonte da controllare (es. "riduzione del 70% delle annotazioni" → paper One-shot AL, MICCAI 2025).
- Date coerenti tra pagine e con il CV.

### Riservatezza verso il datore di lavoro
- Nessun nome di cliente, progetto interno, repository, endpoint, metrica su dati interni. Confronta il testo con il CV pubblico: il sito non deve essere più dettagliato del CV. Non leggere né citare documentazione interna dei progetti.
- Da far verificare all'utente: la policy aziendale su social media e comunicazioni esterne (citare il datore di lavoro, descrivere il proprio ruolo, disclaimer "opinioni personali" già presente nel footer).

### Foto, immagini, loghi
- Ritratto: chi ha scattato la foto? Il fotografo ha diritti sulla foto (L. 633/1941, anche art. 87 per le fotografie semplici); serve il suo permesso per pubblicarla. Se nella foto compaiono altre persone serve il loro consenso (art. 96).
- Foto ritoccate: lo sfondo del ritratto è stato sfocato con segmentazione automatica, il viso è intatto. Segnala all'utente di valutare se dichiararlo; dal 2 agosto 2026 l'AI Act (Reg. UE 2024/1689, art. 50) impone trasparenza sui "deep fake": un ritocco dello sfondo probabilmente non lo è, ma è da verificare.
- Figure dei paper: controlla la licenza di ogni pubblicazione (arXiv, MELBA, atti MICCAI/BMVC) e se l'autore può riusare le figure sul proprio sito.
- Immagini con watermark di generatori AI (es. la stellina di Gemini): segnalale; o si sostituiscono o si dichiara l'uso dell'AI.
- Loghi e marchi di terzi oggi in uso, da verificare con le linee guida di marchio di ciascuno:
  - loghi delle organizzazioni (Accenture, SAP, Sorbonne Université, EURECOM, Politecnico di Torino) in home e in Esperienza, mostrati come sagome monocromatiche che prendono il colore del marchio al passaggio del mouse (`Logo.astro`): l'alterazione del colore potrebbe non essere ammessa;
  - loghi di framework e strumenti nelle competenze e nei chip della home (`TechLogo.astro`, `src/assets/logos/tech/`: Simple Icons CC0, Azure e OpenAI da Wikimedia Commons), solo strumenti presenti nel CV;
  - copertine dei talk (`src/assets/talks/*.jpg`, prima slide di ogni deck): mostrano nomi di coautori e membri della commissione, una foto di Daniele e loghi di ERC, ANR, UE, MICCAI e delle istituzioni. Sono già pubbliche nei deck, ma vanno confermate. Non pubblicate per immagini di terzi: la copertina TopCoW (foto di una mucca di fonte ignota, `SKIP` nello script) e le copertine dei seminari (grafica ufficiale di MICCAI 2025 con foto del centro congressi; illustrazione di origine ignota; i journal club possono mostrare lavori altrui): la card dei seminari mostra fogli neutri (`GROUP_COVERS = {}`).
- Finanziamento ERC/UE: se si presentano risultati di un progetto finanziato (CARAVEL), verificare gli obblighi di riconoscimento del finanziamento previsti dal grant agreement (dicitura ed emblema UE).

### Dati professionali obbligatori
- **Oggi non servono**: niente P.IVA (art. 35 DPR 633/1972 riguarda chi ha la Partita IVA), niente albo, niente informazioni da prestatore di servizi (D.Lgs. 70/2003, art. 7) perché il sito non offre servizi a pagamento.
- Da riverificare se: apre la P.IVA, offre consulenze o vende qualcosa tramite il sito, si iscrive a un albo (es. Ordine degli Ingegneri), o il sito diventa di un'attività.
- Non inserire mai dati inventati o "segnaposto" (es. "P.IVA: 00000000000").

## 3. Formato del report

Rispondi in italiano, senza emoji, con tre sezioni:

1. **Controllato e a posto** – cosa hai verificato tu, con l'evidenza (comando, file, risultato).
2. **Corretto adesso** – cosa hai modificato, file per file.
3. **Da verificare prima di pubblicare** – lista numerata; per ogni voce: cosa verificare, perché (norma o rischio), come verificarlo, chi può farlo. Includi sempre, finché restano aperte:
   - autorizzazione del fotografo per il ritratto;
   - policy aziendale su comunicazioni esterne e menzione del datore di lavoro;
   - contenuto del CV in PDF: coerenza con il sito (titolo, affermazioni come "SOTA", "Top 9%", "70%") e assenza del telefono;
   - licenze delle figure dei paper;
   - fonti dei numeri e dei riconoscimenti citati;
   - obblighi di riconoscimento del finanziamento ERC;
   - testo dell'informativa privacy riletto da Daniele (e, se vuole certezza, da un professionista).

Chiudi dicendo chiaramente se, per quanto verificabile da te, il sito è pubblicabile, e cosa resta in mano all'utente.
