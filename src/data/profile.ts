/**
 * Identity, links and the short texts used across the site.
 * Source of truth: Daniele_Falcetta_AI_Engineer_CV.tex (September 2026) and the
 * LinkedIn positioning report. Keep claims verifiable; see CLAUDE.md.
 */
import type { L10n } from '../i18n/ui';
import type { TechName } from '../components/TechLogo.astro';

export const person = {
  name: 'Daniele Falcetta',
  email: 'danielefalcetta228@gmail.com',
  role: {
    en: 'AI Engineer & Decision Science Consultant',
    it: 'AI Engineer & Decision Science Consultant',
  } satisfies L10n,
  /** One-line description used in <meta name="description"> and social cards. */
  description: {
    en: 'AI engineer at Accenture: generative AI, document intelligence and computer vision for banks and insurers, from requirements to production. PhD in deep learning.',
    it: 'AI engineer in Accenture: generative AI, document intelligence e computer vision per banche e assicurazioni, dai requisiti alla produzione. Dottorato in deep learning.',
  } satisfies L10n,
  links: {
    linkedin: 'https://www.linkedin.com/in/danielefalcetta',
    scholar: 'https://scholar.google.fr/citations?user=4LHNCl0AAAAJ&hl=en',
    github: 'https://github.com/2Falx',
    orcid: 'https://orcid.org/0009-0009-7199-5424',
  },
  cv: 'cv/Daniele_Falcetta_CV.pdf',
};

/** One sentence under the name in the hero. */
export const tagline: L10n = {
  en: 'At Accenture I design and deliver generative AI, document intelligence and computer vision solutions for banks and insurers, from requirements to production. PhD in deep learning.',
  it: 'In Accenture progetto e realizzo soluzioni di generative AI, document intelligence e computer vision per banche e assicurazioni, dai requisiti alla produzione. Dottorato in deep learning.',
};

export interface Skill {
  name: string | L10n;
  /** Logo file in src/assets/logos/tech (only tools named in the CV). */
  logo?: TechName;
}

/** Current work, written at the level of detail already public in the CV. */
export const now = {
  title: { en: 'What I work on now', it: 'Di cosa mi occupo oggi' } satisfies L10n,
  areas: [
    {
      title: { en: 'Generative AI and enterprise search', it: 'Generative AI ed enterprise search' },
      body: {
        en: 'RAG assistants and hybrid search over banking documents, with answers traceable to their source.',
        it: 'Assistenti RAG e ricerca ibrida su documenti bancari, con risposte riconducibili alla fonte.',
      },
      tags: [{ name: 'RAG' }, { name: 'FastAPI', logo: 'fastapi' }, { name: 'Gemini', logo: 'googlegemini' }, { name: 'Azure OpenAI', logo: 'openai' }],
    },
    {
      title: { en: 'Documents and computer vision', it: 'Documenti e computer vision' },
      body: {
        en: 'OCR and transcription pipelines for documents and calls, and vehicle repair cost estimates, so insurance claims are opened without manual entry.',
        it: 'Pipeline di OCR e trascrizione per documenti e telefonate, oltre alla stima dei costi di riparazione dei veicoli, per aprire i sinistri senza inserimento manuale.',
      },
      tags: [{ name: 'OCR' }, { name: 'Document Intelligence', logo: 'azure' }, { name: 'YOLOv8' }, { name: 'CLIP' }],
    },
    {
      title: { en: 'Production and MLOps', it: 'Messa in produzione e MLOps' },
      body: {
        en: 'Real-time and batch pipelines on Azure and Google Cloud, with CI/CD, evaluation sets and guardrails.',
        it: 'Pipeline real-time e batch su Azure e Google Cloud, con CI/CD, dataset di valutazione e guardrail.',
      },
      tags: [{ name: 'Azure ML', logo: 'azure' }, { name: 'Cloud Run', logo: 'googlecloud' }, { name: 'MLflow', logo: 'mlflow' }, { name: 'Terraform', logo: 'terraform' }],
    },
  ] satisfies { title: L10n; body: L10n; tags: Skill[] }[],
};


/** Skills, grouped for a corporate reader. Sources: CV (skills section) and General.tex (TensorFlow). */
export const skills: { group: L10n; items: Skill[] }[] = [
  {
    group: { en: 'Generative AI and LLMs', it: 'Generative AI e LLM' },
    items: [
      { name: 'Azure OpenAI', logo: 'openai' },
      { name: 'Gemini / Vertex AI', logo: 'googlegemini' },
      { name: 'RAG' },
      { name: 'Hybrid retrieval' },
      { name: 'Reranking' },
      { name: 'LangGraph' },
      { name: 'Pydantic structured output', logo: 'pydantic' },
      { name: { en: 'Guardrails', it: 'Guardrail' } },
      { name: { en: 'LLM evaluation', it: 'Valutazione degli LLM' } },
    ],
  },
  {
    group: { en: 'Cloud and MLOps', it: 'Cloud e MLOps' },
    items: [
      { name: 'Azure Machine Learning', logo: 'azure' },
      { name: 'Azure Document Intelligence', logo: 'azure' },
      { name: 'Speech Services' },
      { name: 'Google Cloud Run', logo: 'googlecloud' },
      { name: 'MLflow', logo: 'mlflow' },
      { name: 'Docker', logo: 'docker' },
      { name: 'Terraform', logo: 'terraform' },
      { name: 'CI/CD' },
      { name: 'Databricks', logo: 'databricks' },
      { name: 'Weights & Biases', logo: 'weightsandbiases' },
      { name: 'Slurm' },
    ],
  },
  {
    group: { en: 'Software and data', it: 'Software e dati' },
    items: [
      { name: 'Python', logo: 'python' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: { en: 'REST APIs', it: 'API REST' } },
      { name: 'PostgreSQL / pgvector', logo: 'postgresql' },
      { name: 'Cosmos DB' },
      { name: 'Azure Data Lake' },
      { name: 'NumPy', logo: 'numpy' },
      { name: 'pandas', logo: 'pandas' },
      { name: 'Git', logo: 'git' },
      { name: 'Linux', logo: 'linux' },
      { name: 'Bash', logo: 'gnubash' },
      { name: 'Unit testing' },
    ],
  },
  {
    group: { en: 'Machine learning and computer vision', it: 'Machine learning e computer vision' },
    items: [
      { name: 'PyTorch', logo: 'pytorch' },
      { name: 'TensorFlow', logo: 'tensorflow' },
      { name: 'Transformers' },
      { name: 'YOLOv8' },
      { name: 'CLIP' },
      { name: 'OCR' },
      { name: 'XGBoost' },
      { name: 'Optuna' },
      { name: 'scikit-learn', logo: 'scikitlearn' },
      { name: 'Active learning' },
      { name: 'Domain adaptation' },
    ],
  },
  {
    group: { en: 'Methods', it: 'Metodi' },
    items: [
      { name: { en: 'Functional analysis', it: 'Analisi funzionale' } },
      { name: { en: 'Solution architecture', it: 'Architettura della soluzione' } },
      { name: { en: 'Statistical analysis', it: 'Analisi statistica' } },
      { name: { en: 'Experiment design', it: 'Disegno sperimentale' } },
      { name: 'LaTeX', logo: 'latex' },
    ],
  },
];
