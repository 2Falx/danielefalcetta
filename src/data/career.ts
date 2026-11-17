/**
 * Work and education as one vessel: a trunk (newest first, the BSc is the
 * root) with branches for parallel periods. Awards.
 * Source: Daniele_Falcetta_AI_Engineer_CV.tex (September 2026). Client names
 * and internal project names stay out of this file on purpose. The full
 * detail is in the CV PDF; the site keeps one line per stop.
 */
import type { L10n } from '../i18n/ui';
import type { LogoName } from '../components/Logo.astro';

export interface Stop {
  id: string;
  kind: 'work' | 'edu';
  title: L10n;
  /** English words at the start of the Italian title, read with English pronunciation. */
  enPrefix?: string;
  org: string;
  place?: L10n;
  /** Years; an L10n only for the open range ("2026–present"). */
  when: string | L10n;
  logos?: LogoName[];
  /** One line under the title. */
  summary?: L10n;
  /** Shown in a "Details" disclosure. */
  points?: L10n[];
  /** Disclosure open by default. */
  open?: boolean;
  note?: L10n;
  /** Parallel periods, drawn as branches off this stop. */
  branches?: Stop[];
}

export const vessel: Stop[] = [
  {
    id: 'accenture',
    kind: 'work',
    title: { en: 'AI Decision Science Consultant', it: 'AI Decision Science Consultant' },
    org: 'Accenture, Data & AI',
    place: { en: 'Modena, Italy', it: 'Modena' },
    when: { en: '2026–present', it: '2026–oggi' },
    logos: ['accenture'],
    open: true,
    summary: {
      en: 'Enterprise AI solutions for banking and insurance, from requirements to production.',
      it: 'Soluzioni AI enterprise per banche e assicurazioni, dai requisiti alla produzione.',
    },
    points: [
      {
        en: 'RAG assistants and hybrid search over banking documentation',
        it: 'Assistenti RAG e ricerca ibrida sulla documentazione bancaria',
      },
      {
        en: 'OCR, document and call processing, signature detection, vehicle repair cost estimation',
        it: 'OCR, analisi di documenti e telefonate, rilevamento delle firme, stima dei costi di riparazione dei veicoli',
      },
      {
        en: 'Production on Azure and Google Cloud: real-time and batch, CI/CD',
        it: 'Messa in produzione su Azure e Google Cloud: real-time e batch, CI/CD',
      },
    ],
  },
  {
    id: 'phd',
    kind: 'work',
    title: { en: 'AI Research Scientist (PhD)', it: 'Ricercatore AI (dottorato)' },
    org: 'Sorbonne Université & EURECOM',
    place: { en: 'Biot, France', it: 'Biot, Francia' },
    when: '2023–2026',
    logos: ['sorbonne', 'eurecom'],
    // Claim worded as in the MICCAI 2025 paper (#2457), not as in the CV.
    summary: {
      en: 'Deep learning for 3D medical imaging: one-shot active learning that nearly matches fully supervised performance with only 30% of the labels.',
      it: 'Deep learning per l’imaging medico 3D: active learning one-shot che si avvicina alle prestazioni del modello completamente supervisionato usando solo il 30% delle etichette.',
    },
    points: [
      {
        en: 'Teaching assistant for the graduate course “Machine Learning and Intelligent Systems” at EURECOM.',
        it: 'Assistente alla didattica nel corso magistrale “Machine Learning and Intelligent Systems” a EURECOM.',
      },
    ],
    branches: [
      {
        id: 'phd-degree',
        kind: 'edu',
        title: { en: 'PhD in Artificial Intelligence and Deep Learning', it: 'Dottorato in Intelligenza Artificiale e Deep Learning' },
        org: 'Sorbonne Université & EURECOM',
        when: '2023–2026',
        logos: ['sorbonne', 'eurecom'],
        note: { en: 'Thesis defended in 2026.', it: 'Tesi discussa nel 2026.' },
      },
    ],
  },
  {
    id: 'sap',
    kind: 'work',
    title: { en: 'AI Research Engineer Intern, NLP and Security', it: 'AI Research Engineer Intern (NLP e sicurezza)' },
    enPrefix: 'AI Research Engineer Intern',
    org: 'SAP Labs',
    place: { en: 'Sophia Antipolis, France', it: 'Sophia Antipolis, Francia' },
    when: '2022–2023',
    logos: ['sap'],
    summary: {
      en: 'MultiPath2Vec: an attention-based model that flags security vulnerabilities in code commits.',
      it: 'MultiPath2Vec: un modello basato su attention che individua vulnerabilità di sicurezza nei commit di codice.',
    },
    branches: [
      {
        id: 'msc',
        kind: 'edu',
        title: { en: 'MSc in Data Science and Engineering', it: 'Laurea magistrale in Data Science and Engineering' },
        org: 'Politecnico di Torino & EURECOM',
        when: '2020–2023',
        logos: ['polito', 'eurecom'],
        note: {
          en: 'Double degree; academic (2020) and mobility (2021) scholarships.',
          it: 'Doppia laurea; borsa di studio accademica (2020) e borsa di mobilità (2021).',
        },
      },
    ],
  },
  {
    id: 'bsc',
    kind: 'edu',
    title: { en: 'BSc in Biomedical Engineering', it: 'Laurea triennale in Ingegneria Biomedica' },
    org: 'Politecnico di Torino',
    when: '2017–2020',
    logos: ['polito'],
    note: { en: '“Talenti” honours programme.', it: 'Percorso di eccellenza “Talenti”.' },
  },
];

/** Every stop, trunk and branches, in page order. */
export const allStops = (stops: Stop[] = vessel): Stop[] =>
  stops.flatMap((s) => [s, ...allStops(s.branches ?? [])]);

export interface Award {
  title: L10n;
  detail: L10n;
  when: string;
}

export const awards: Award[] = [
  {
    title: { en: 'Best Paper Award', it: 'Best Paper Award' },
    detail: { en: 'MICCAI Deep Breast Workshop', it: 'MICCAI Deep Breast Workshop' },
    when: '2025',
  },
  {
    title: { en: 'Spotlight talk', it: 'Presentazione spotlight' },
    detail: { en: 'VesselVerse, MICCAI 2025', it: 'VesselVerse, MICCAI 2025' },
    when: '2025',
  },
  {
    title: { en: 'Doctoral Consortium finalist', it: 'Finalista al Doctoral Consortium' },
    detail: { en: 'MICCAI 2025', it: 'MICCAI 2025' },
    when: '2025',
  },
  {
    title: { en: 'Challenge co-organiser', it: 'Co-organizzatore della challenge' },
    detail: { en: 'TopBrain, MICCAI 2025: evaluation metrics and rules', it: 'TopBrain, MICCAI 2025: metriche di valutazione e regole' },
    when: '2024–2025',
  },
  {
    title: { en: 'World AI Cannes Festival', it: 'World AI Cannes Festival' },
    detail: { en: 'Presented PhD research', it: 'Presentazione della ricerca di dottorato' },
    when: '2024–2025',
  },
];
