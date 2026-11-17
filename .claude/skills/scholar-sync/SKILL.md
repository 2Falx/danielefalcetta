---
name: scholar-sync
description: Aggiorna la pagina Ricerca del sito con le pubblicazioni nuove o mancanti prese dal profilo Google Scholar di Daniele (user 4LHNCl0AAAAJ), verificando autori, sede e link alla fonte originale (DOI, arXiv, medRxiv, atti, archivi delle tesi). Usala quando l'utente chiede "aggiorna le pubblicazioni", "aggiungi le pubblicazioni da Scholar", "sync Google Scholar", "manca un paper sul sito".
---

# Sincronizzare le pubblicazioni da Google Scholar

Obiettivo: ogni pubblicazione presente su Google Scholar compare sul sito una sola volta, con dati verificati alla fonte.
Regola d'oro: **non inventare**. Scholar dà solo una lista abbreviata; autori, sede, anno e link vanno presi dalla fonte originale.

## 1. Trova cosa manca

```bash
.venv/Scripts/python scripts/scholar_diff.py
```

Lo script scarica la lista del profilo (ordinata per data) con `curl` e la confronta con `publications` in `src/data/research.ts`.
Stampa le voci mancanti con titolo, anno, autori e sede abbreviati, e le voci ignorate con il motivo
(`scripts/scholar_ignore.json`). Se dice che il profilo non è leggibile, riprova più tardi: Google può bloccare temporaneamente.

Le pagine di dettaglio di Scholar rispondono "Verifying…" ai client automatici: non usarle.

## 2. Verifica ogni voce alla fonte

Per ogni voce mancante:

| Tipo | Dove prendere i dati | Come |
|---|---|---|
| Articolo con DOI (Springer/LNCS, NEJM, IEEE, Elsevier…) | doi.org | `curl -sL -H "Accept: application/vnd.citationstyles.csl+json" https://doi.org/<DOI>`: titolo, autori completi, rivista/atti, volume, pagine, data |
| Preprint medRxiv/bioRxiv | doi.org (prefisso `10.64898/…` o `10.1101/…`) | come sopra; l'API `api.biorxiv.org` può non avere i DOI nuovi |
| arXiv | `https://arxiv.org/abs/<id>` | meta `citation_title`, `citation_author` |
| Tesi | archivio dell'ateneo (WebThesis PoliTo, pagine pubblicazione EURECOM, HAL/theses.fr) | titolo e anno dalla pagina |
| Non trovi il DOI | ricerca web con il titolo esatto tra virgolette | pagine EURECOM (`eurecom.fr/en/publication/<n>`) spesso danno autori, sede e DOI |

Controlla sempre:
- che **Daniele sia tra gli autori** (posizione nell'elenco);
- titolo esatto (maiuscole, trattini) come nella fonte;
- che il link risponda (`curl -s -o /dev/null -w '%{http_code}' -L`). Alcuni editori (NEJM) rispondono 403 agli script ma il DOI è valido se i metadati CSL arrivano.

## 3. Decidi come inserirla

- **Preprint di un lavoro già pubblicato**: tieni solo la versione pubblicata; aggiorna anche il link "Paper" del progetto collegato in `projects`. Aggiungi il preprint a `scripts/scholar_ignore.json` con il motivo.
- **Interventi, poster, abstract di un talk** già nella pagina Interventi: non duplicarli; aggiungili a `scholar_ignore.json`.
- **Tesi**: `kind: 'thesis'` con nota `{ en: 'PhD', it: 'Dottorato' }` o `{ en: 'MSc', it: 'Laurea magistrale' }`.
- **Voce senza sede né anno su Scholar**: cerca la fonte; se non la trovi, non pubblicarla e chiedi all'utente.

## 4. Scrivi in `src/data/research.ts`

Formato di una voce (in `publications`, dal più recente; dentro lo stesso anno in ordine di data):

```ts
{
  title: 'Titolo esatto',
  authors: 'X. Zhang, M. Dannecker, …, D. Falcetta, et al.',
  venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI), LNCS, pp. 475–485',
  year: '2026',
  href: 'https://doi.org/…',
  kind: 'conference', // conference | journal | workshop | abstract | preprint | thesis
  notes: [{ en: '…', it: '…' }], // facoltativo, sempre EN + IT
},
```

- Autori: iniziali + cognome come nella fonte; fino a ~11 autori elencali tutti, oltre usa i primi 3–4, `…`, `D. Falcetta`, `et al.`
- `hasProject: true` solo se Daniele è **primo autore** e il lavoro ha già una scheda in `projects` (la riga autori viene nascosta). Mai per i lavori da coautore.
- Link: DOI o pagina ufficiale; Google Scholar solo se non esiste altro.
- Nessun superlativo, nessun numero non presente nel paper; niente emoji.
- Se compaiono sedi nuove (es. una rivista), aggiorna `copy.description` in `src/views/Research.astro` (EN + IT).

## 5. Verifica

```bash
npx astro check                                                 # 0 errori
.venv/Scripts/python scripts/scholar_diff.py                    # deve dire 0 mancanti
.venv/Scripts/python scripts/check_site.py --pages research/ it/research/   # 0 problemi
```

Guarda lo screenshot della sezione pubblicazioni (EN e IT). Poi, se l'utente lo chiede, commit in questo repo con
identità `2Falx <daniele.falcetta228@gmail.com>` (config locale) e **senza** righe `Co-Authored-By`; nessun push senza richiesta.

## 6. Report all'utente

Elenca: voci aggiunte (con fonte e posizione di Daniele tra gli autori), voci sostituite o ignorate (con motivo), voci non
pubblicate perché non verificabili. Ricorda le verifiche aperte della skill `prepublish-check` se si sta per pubblicare.
