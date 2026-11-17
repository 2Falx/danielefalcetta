/**
 * Projects and publications. Links were carried over from the previous site;
 * publication links point to the paper where one is known, otherwise to the
 * Google Scholar entry.
 */
import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n/ui';
import caravel from '../assets/pipelines/CaravelMetrics.png';
import vesselverse from '../assets/pipelines/Vesselverse.png';
import oneShot from '../assets/pipelines/One-Shot.png';

export interface Link {
  label: L10n;
  href: string;
}

export interface Project {
  title: L10n;
  venue: string;
  year: string;
  summary: L10n;
  figure?: { src: ImageMetadata; alt: L10n };
  links: Link[];
  /** Work done within CARAVEL, an ERC-funded research project Daniele was part of. */
  erc?: boolean;
  /** Shown on Home and with its figure on Research; the others are compact text rows. */
  featured?: boolean;
}

const paper: L10n = { en: 'Paper', it: 'Articolo' };
const code: L10n = { en: 'Code', it: 'Codice' };

export const projects: Project[] = [
  {
    title: { en: 'CaravelMetrics', it: 'CaravelMetrics' },
    featured: true,
    venue: 'ISBI 2026',
    year: '2026',
    summary: {
      en: 'Turns 3D brain-vessel segmentations into graphs and extracts morphometric, topological, fractal and geometric features, for analysis at scale.',
      it: 'Trasforma le segmentazioni 3D dei vasi cerebrali in grafi ed estrae caratteristiche morfometriche, topologiche, frattali e geometriche, per analisi su larga scala.',
    },
    figure: {
      src: caravel,
      alt: {
        en: 'CaravelMetrics pipeline. A 3D binary vessel mask is converted into a graph for whole-brain analysis; in parallel, MRA and T1 images are aligned to an arterial atlas to build regional vessel graphs. Features are then extracted in four groups: morphometric, topological, fractal and geometric.',
        it: 'Pipeline di CaravelMetrics. Una maschera binaria 3D dei vasi viene convertita in grafo per l’analisi dell’intero cervello; in parallelo, le immagini MRA e T1 vengono allineate a un atlante arterioso per costruire grafi regionali. Le caratteristiche estratte sono di quattro tipi: morfometriche, topologiche, frattali e geometriche.',
      },
    },
    links: [
      { label: paper, href: 'https://arxiv.org/abs/2512.03869' },
      { label: code, href: 'https://github.com/i-vesseg/CaravelMetrics' },
    ],
    erc: true,
  },
  {
    title: { en: 'VesselVerse', it: 'VesselVerse' },
    featured: true,
    venue: 'MICCAI 2025',
    year: '2025',
    summary: {
      en: 'A brain-vessel dataset and collaborative annotation framework that combines expert and AI annotations and keeps every validated version. Early acceptance and spotlight at MICCAI 2025.',
      it: 'Un dataset di vasi cerebrali e un framework collaborativo di annotazione che combina annotazioni di esperti e di modelli AI e conserva ogni versione validata. Early acceptance e spotlight a MICCAI 2025.',
    },
    figure: {
      src: vesselverse,
      alt: {
        en: 'VesselVerse workflow. Annotations from human experts and AI models are stored in a versioned database and combined with STAPLE; an annotator corrects them in the VesselVerse framework, a validator accepts or rejects the change, and accepted refinements become a new version.',
        it: 'Flusso di lavoro di VesselVerse. Le annotazioni di esperti e modelli AI sono archiviate in un database versionato e combinate con STAPLE; un annotatore le corregge nel framework VesselVerse, un validatore accetta o rifiuta la modifica e le correzioni accettate diventano una nuova versione.',
      },
    },
    links: [
      { label: { en: 'Website', it: 'Sito' }, href: 'https://i-vesseg.github.io/vesselverse/' },
      { label: paper, href: 'https://papers.miccai.org/miccai-2025/paper/0087_paper.pdf' },
      { label: code, href: 'https://github.com/i-vesseg/VesselVerse-Framework' },
    ],
    erc: true,
  },
  {
    title: { en: 'One-shot active learning for vessel segmentation', it: 'Active learning one-shot per la segmentazione dei vasi' },
    featured: true,
    venue: 'MICCAI 2025',
    year: '2025',
    summary: {
      en: 'Selects in a single round which scan patches to annotate, and nearly matches fully supervised performance with only 30% of the labels. Early acceptance at MICCAI 2025.',
      it: 'Sceglie in un solo passaggio quali porzioni delle scansioni annotare e si avvicina alle prestazioni del modello completamente supervisionato usando solo il 30% delle etichette. Early acceptance a MICCAI 2025.',
    },
    figure: {
      src: oneShot,
      alt: {
        en: 'One-shot active learning pipeline. A LISTA encoder maps binary vessel annotations to sparse latent vectors over a learned dictionary; K-means on these vectors gives labels used to train a weight-sharing encoder on MRI brain patches; its embeddings are shown as a t-SNE plot.',
        it: 'Pipeline di active learning one-shot. Un encoder LISTA trasforma le annotazioni binarie dei vasi in vettori latenti sparsi su un dizionario appreso; il K-means su questi vettori fornisce etichette per addestrare un encoder a pesi condivisi sulle patch MRI del cervello; i suoi embedding sono mostrati in un grafico t-SNE.',
      },
    },
    links: [
      { label: paper, href: 'https://papers.miccai.org/miccai-2025/paper/2457_paper.pdf' },
      { label: code, href: 'https://github.com/i-vesseg/V-DiSNet' },
    ],
  },
  {
    title: { en: 'Multi-domain brain-vessel segmentation', it: 'Segmentazione multi-dominio dei vasi cerebrali' },
    venue: 'MELBA',
    year: '2025',
    summary: {
      en: 'Separates anatomical content from imaging style, so one model segments brain vessels across different scanners and modalities. Published in Machine Learning for Biomedical Imaging.',
      it: 'Separa il contenuto anatomico dallo stile di acquisizione, così un solo modello segmenta i vasi cerebrali in immagini di scanner e modalità diversi. Pubblicato su Machine Learning for Biomedical Imaging.',
    },
    links: [
      { label: paper, href: 'https://www.melba-journal.org/pdf/2025:021.pdf' },
      { label: code, href: 'https://github.com/i-vesseg/MultiVesSeg' },
    ],
  },
  {
    title: { en: 'A2V', it: 'A2V' },
    venue: 'BMVC 2023',
    year: '2023',
    summary: {
      en: 'Semi-supervised domain adaptation for brain-vessel segmentation: a two-phase training scheme that translates angiography into venography so labels can be reused across modalities.',
      it: 'Domain adaptation semi-supervisionata per la segmentazione dei vasi cerebrali: un addestramento in due fasi che traduce l’angiografia in venografia per riutilizzare le etichette tra modalità.',
    },
    links: [
      { label: paper, href: 'https://arxiv.org/abs/2309.06075' },
      { label: code, href: 'https://github.com/i-vesseg/MultiVesSeg' },
    ],
  },
  {
    title: { en: 'TopCoW challenge', it: 'Challenge TopCoW' },
    venue: 'MICCAI 2023',
    year: '2023',
    summary: {
      en: 'A benchmark for topology-aware anatomical segmentation of the Circle of Willis on CTA and MRA, the structure drawn at the top of this page.',
      it: 'Un benchmark per la segmentazione anatomica, attenta alla topologia, del circolo di Willis (la struttura disegnata in cima a questa pagina) su CTA e MRA.',
    },
    links: [
      { label: paper, href: 'https://arxiv.org/abs/2312.17670' },
      { label: { en: 'Challenge website', it: 'Sito della challenge' }, href: 'https://topcow24.grand-challenge.org/topcow24/' },
    ],
  },
  {
    title: { en: 'MultiPath2Vec', it: 'MultiPath2Vec' },
    venue: 'SAP Labs',
    year: '2023',
    summary: {
      en: 'An attention-based model that detects security vulnerabilities in code commits, developed during my research internship at SAP Labs France.',
      it: 'Un modello basato su attention che individua vulnerabilità di sicurezza nei commit di codice, sviluppato durante lo stage di ricerca in SAP Labs France.',
    },
    links: [{ label: { en: 'MSc thesis', it: 'Tesi magistrale' }, href: 'https://webthesis.biblio.polito.it/26681/' }],
  },
];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  href?: string;
  kind: 'conference' | 'journal' | 'workshop' | 'abstract' | 'preprint';
  notes?: L10n[];
  /**
   * First-author paper already presented as a project above: the author line
   * is not repeated. Co-authored papers always keep their author line.
   */
  hasProject?: boolean;
}

export const publications: Publication[] = [
  {
    hasProject: true,
    title: 'An Automated Framework for Large-Scale Graph-Based Cerebrovascular Analysis',
    authors: 'D. Falcetta, et al.',
    venue: 'IEEE International Symposium on Biomedical Imaging (ISBI)',
    year: '2026',
    href: 'https://arxiv.org/abs/2512.03869',
    kind: 'conference',
  },
  {
    hasProject: true,
    title: 'One-shot Active Learning for Vessel Segmentation',
    authors: 'D. Falcetta, et al.',
    venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI)',
    year: '2025',
    href: 'https://papers.miccai.org/miccai-2025/paper/2457_paper.pdf',
    kind: 'conference',
    notes: [{ en: 'Early acceptance', it: 'Early acceptance' }],
  },
  {
    hasProject: true,
    title: 'VesselVerse: A Dataset and Collaborative Framework for Vessel Annotation',
    authors: 'D. Falcetta, et al.',
    venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI)',
    year: '2025',
    href: 'https://papers.miccai.org/miccai-2025/paper/0087_paper.pdf',
    kind: 'conference',
    notes: [
      { en: 'Early acceptance', it: 'Early acceptance' },
      { en: 'Spotlight', it: 'Spotlight' },
    ],
  },
  {
    title: 'Divergence-Aware Training with Automatic Subgroup-Mitigation for Breast Tumor Segmentation',
    authors: 'E. Poeta, L. Vargas, D. Falcetta, V. Marciano, et al.',
    venue: 'MICCAI Deep Breast Workshop',
    year: '2025',
    href: 'https://scholar.google.fr/citations?view_op=view_citation&hl=en&user=4LHNCl0AAAAJ&citation_for_view=4LHNCl0AAAAJ:UeHWp8X0CEIC',
    kind: 'workshop',
    notes: [{ en: 'Best Paper Award', it: 'Best Paper Award' }],
  },
  {
    title: 'Initial Analysis of Intracranial MR Angiography from the TwinsUK Large Cohort Twin Imaging Study',
    authors: 'J.O. Cleary, L.S. Canas, M.A. Zuluaga, D. Falcetta, et al.',
    venue: 'British Society of Neuroradiologists’ Annual Meeting (BSNR)',
    year: '2025',
    kind: 'abstract',
  },
  {
    title: 'Multi-Domain Brain Vessel Segmentation Through Feature Disentanglement',
    authors: 'F. Galati*, D. Falcetta*, R. Cortese, F. Prados, N. Burgos, M.A. Zuluaga',
    venue: 'Machine Learning for Biomedical Imaging (MELBA), vol. 3, pp. 477–495',
    year: '2025',
    href: 'https://www.melba-journal.org/pdf/2025:021.pdf',
    kind: 'journal',
    notes: [{ en: '* equal contribution', it: '* contributo paritario' }],
  },
  {
    title: 'Benchmarking the CoW with the TopCoW Challenge: Topology-Aware Anatomical Segmentation of the Circle of Willis for CTA and MRA',
    authors: 'K. Yang, F. Musio, Y. Ma, …, D. Falcetta, et al.',
    venue: 'arXiv:2312.17670',
    year: '2024',
    href: 'https://arxiv.org/abs/2312.17670',
    kind: 'preprint',
  },
  {
    title: 'A2V: A Semi-Supervised Domain Adaptation Framework for Brain Vessel Segmentation via Two-Phase Training Angiography-to-Venography Translation',
    authors: 'F. Galati, D. Falcetta, et al.',
    venue: 'British Machine Vision Conference (BMVC)',
    year: '2023',
    href: 'https://arxiv.org/abs/2309.06075',
    kind: 'conference',
  },
];

export const kindLabel: Record<Publication['kind'], L10n> = {
  conference: { en: 'Conference', it: 'Conferenza' },
  journal: { en: 'Journal', it: 'Rivista' },
  workshop: { en: 'Workshop', it: 'Workshop' },
  abstract: { en: 'Abstract', it: 'Abstract' },
  preprint: { en: 'Preprint', it: 'Preprint' },
};

/** Stable anchor id for a project, used for links from the home page. */
export const slug = (p: Project) =>
  p.title.en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
