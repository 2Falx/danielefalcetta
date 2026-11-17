---
name: site-content
description: Aggiornare i contenuti del sito personale - nuove esperienze lavorative, pubblicazioni, progetti, interventi/talk, premi, competenze, testo della home - partendo dal CV aggiornato o dal profilo LinkedIn, in inglese e italiano. Usala quando l'utente dice "aggiorna il sito col nuovo CV", "aggiungi questa pubblicazione/talk", "ho cambiato lavoro", "add a paper", "update my experience".
---

# Aggiornare i contenuti

Tutti i contenuti stanno in `src/data/` e sono bilingui (`{ en: '...', it: '...' }`). Le pagine si aggiornano da sole.

## Fonti (in ordine di affidabilità)

1. Quello che l'utente scrive nella conversazione.
2. Il CV in LaTeX: `C:\Users\daniele.falcetta\OneDrive - Accenture\Documents\PROGETTI\Daniele_Falcetta_AI_Engineer_CV.tex` (ha una pagina EN e una IT) e `General.tex` (versione accademica). Se c'è un CV più recente, chiedi quale usare.
3. Il report sul profilo LinkedIn nella stessa cartella (`Report_finale_profilo_LinkedIn_*.pdf`): posizionamento e formulazioni pubbliche consigliate.
4. Il paper o la pagina ufficiale della conferenza, per titoli, autori, venue e link.

Il profilo LinkedIn non è leggibile in automatico (blocca i client, HTTP 999): chiedi all'utente di incollare il testo se serve.
**Non usare** i file `CLAUDE_*.md` della cartella PROGETTI: sono documentazione interna di progetti cliente.

## Dove va cosa

| Contenuto | File | Note |
|---|---|---|
| Ruolo, descrizione meta, link, intro home, "di cosa mi occupo oggi", competenze | `src/data/profile.ts` | `person.description` è anche la descrizione per Google e i social |
| Esperienze, formazione, premi, collaborazioni | `src/data/career.ts` | in ordine dal più recente |
| Progetti (con figura) e pubblicazioni | `src/data/research.ts` | i primi 3 progetti compaiono anche in home |
| Interventi | `src/data/talks.ts` | serve solo l'ID del deck Google Slides pubblicato (dopo `/d/e/`) |
| CV scaricabile | `public/cv/Daniele_Falcetta_CV.pdf` | sostituisci il file, stesso nome |
| Immagini dei progetti | `src/assets/pipelines/` | importale in `research.ts`; Astro le ottimizza |

## Regole

- Non inventare: niente date, numeri, coautori o venue presunti. Se manca un dato, chiedi.
- Niente superlativi né numeri senza fonte; niente emoji.
- Lavoro in Accenture: solo il livello di dettaglio già presente nel CV; niente nomi di clienti o di progetti interni.
- Traduzioni equivalenti: l'italiano dice la stessa cosa dell'inglese, né di più né di meno.
- Testo alternativo delle figure: apri l'immagine e descrivi cosa mostra davvero, in entrambe le lingue.
- Pubblicazioni: autori come nel paper; il nome `D. Falcetta` viene messo in grassetto in automatico. Link al paper (DOI, arXiv, atti); Google Scholar solo se non c'è altro.
- Se cambia il ruolo principale: aggiorna anche `person.role`, `person.description`, `jobTitle` e `worksFor` nel JSON-LD (`src/layouts/Base.astro`), poi rigenera l'immagine social con `scripts/make_og_image.py`.

## Verifica

1. `npm run dev` e controlla le pagine toccate in EN e IT.
2. `.venv/Scripts/python scripts/check_site.py` → 0 problemi (desktop + mobile, chiaro + scuro).
3. Guarda gli screenshot in `.screenshots/` delle pagine modificate.
4. Prima di pubblicare: skill `prepublish-check`.
