export const languages = { en: 'English', it: 'Italiano' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** A string available in both languages. */
export type L10n = { en: string; it: string };

export const pick = (value: L10n | string, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

/**
 * For text that stays in English on Italian pages (job titles, paper titles):
 * returns 'en' so the element gets lang="en" and is read with English
 * pronunciation (WCAG 3.1.2). Returns undefined when no override is needed.
 */
export const enIfSame = (value: L10n | string, lang: Lang): 'en' | undefined =>
  lang !== 'en' && (typeof value === 'string' || value.en === value.it) ? 'en' : undefined;

const ui = {
  'site.name': { en: 'Daniele Falcetta', it: 'Daniele Falcetta' },
  'skip': { en: 'Skip to content', it: 'Vai al contenuto' },

  'nav.label': { en: 'Main', it: 'Principale' },
  'nav.home': { en: 'Home', it: 'Home' },
  'nav.research': { en: 'Research', it: 'Ricerca' },
  'nav.talks': { en: 'Talks', it: 'Interventi' },
  'nav.experience': { en: 'Experience', it: 'Esperienza' },
  'nav.menu': { en: 'Menu', it: 'Menu' },
  'nav.close': { en: 'Close', it: 'Chiudi' },

  'lang.switch': { en: 'Italiano', it: 'English' },
  'lang.switchLabel': { en: 'Leggi il sito in italiano', it: 'Read this site in English' },

  'theme.toggle': { en: 'Dark theme', it: 'Tema scuro' },

  'fig.title': {
    en: 'The Circle of Willis drawn as a graph',
    it: 'Il circolo di Willis disegnato come grafo',
  },
  'fig.desc': {
    en: 'Schematic of the arterial ring at the base of the brain, shown in 3D from an oblique angle. The ring is formed by the anterior and posterior cerebral arteries, the anterior and posterior communicating arteries and the internal carotid arteries; the basilar artery feeds it and the middle cerebral arteries branch off it. Bifurcations are drawn as nodes and vessel segments as edges.',
    it: 'Schema dell’anello arterioso alla base del cervello, mostrato in 3D da un’angolazione obliqua. L’anello è formato dalle arterie cerebrali anteriori e posteriori, dall’arteria comunicante anteriore, dalle comunicanti posteriori e dalle carotidi interne; l’arteria basilare lo alimenta e da esso si diramano le arterie cerebrali medie. Le biforcazioni sono disegnate come nodi e i segmenti dei vasi come archi.',
  },
  'fig.caption': {
    en: 'The Circle of Willis as a graph: brain vessels like these were the subject of my PhD.',
    it: 'Il circolo di Willis come grafo: vasi cerebrali di questo tipo sono stati l’oggetto del mio dottorato.',
  },

  'emb.title': { en: 'Retrieval in an embedding space', it: 'Retrieval in uno spazio di embedding' },
  'emb.desc': {
    en: 'Illustration with synthetic data. Points are documents grouped by topic and linked to their nearest neighbours, as in a vector index. A red query walks the graph to its region and links to its six nearest documents.',
    it: 'Illustrazione con dati sintetici. I punti sono documenti raggruppati per argomento e collegati ai documenti più vicini, come in un indice vettoriale. Una query, in rosso, percorre il grafo fino alla sua zona e si collega ai sei documenti più vicini.',
  },
  'emb.caption': {
    en: 'Illustration: a query retrieving its nearest documents in an embedding space.',
    it: 'Illustrazione: una query trova i documenti più vicini in uno spazio di embedding.',
  },

  'motion.pause': { en: 'Pause animation', it: 'Metti in pausa l’animazione' },
  'motion.play': { en: 'Play animation', it: 'Riprendi l’animazione' },

  'tools': { en: 'Tools', it: 'Strumenti' },
  'details': { en: 'Details', it: 'Dettagli' },

  'cta.cv': { en: 'Download CV (PDF)', it: 'Scarica il CV (PDF)' },
  'cta.email': { en: 'Email me', it: 'Scrivimi' },

  'footer.privacy': { en: 'Privacy', it: 'Privacy' },
  'footer.nav': { en: 'Site pages', it: 'Pagine del sito' },
  'footer.personal': {
    en: 'Personal website. Content and opinions are my own and do not represent my employer.',
    it: 'Sito personale. Contenuti e opinioni sono miei e non rappresentano il mio datore di lavoro.',
  },
  'footer.noTracking': {
    en: 'No cookies, no analytics, no tracking.',
    it: 'Nessun cookie, nessuna statistica, nessun tracciamento.',
  },

  'talks.all': { en: 'All talks', it: 'Tutti gli interventi' },
  'talks.prev': { en: 'Previous talks', it: 'Interventi precedenti' },
  'talks.next': { en: 'Next talks', it: 'Interventi successivi' },
  'talks.allDecks': { en: 'All decks', it: 'Tutte le slide' },

  'slides.preview': { en: 'Preview', it: 'Anteprima' },
  'slides.load': { en: 'Load slides from Google', it: 'Carica le slide da Google' },
  'slides.openGoogle': { en: 'Open in Google Slides', it: 'Apri su Google Slides' },
  'slides.loading': { en: 'Loading slides from Google…', it: 'Caricamento delle slide da Google…' },
  'slides.slow': {
    en: 'The slides are taking a long time to load. You can open them in Google Slides instead.',
    it: 'Il caricamento sta richiedendo più del previsto. Puoi aprire le slide direttamente su Google Slides.',
  },
  'slides.notice': {
    en: 'Loading the slides here connects your browser to Google (docs.google.com and other Google domains), which may set cookies and receive your IP address.',
    it: 'Se carichi le slide qui, il tuo browser si collega a Google (docs.google.com e altri domini Google), che può impostare cookie e ricevere il tuo indirizzo IP.',
  },

  'external': { en: '(opens in a new tab)', it: '(si apre in una nuova scheda)' },
} as const satisfies Record<string, L10n>;

export type UIKey = keyof typeof ui;

export const t = (lang: Lang, key: UIKey): string => ui[key][lang];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Build an internal URL for a route ('' = home) in the given language. */
export const route = (lang: Lang, path = ''): string => {
  const clean = path.replace(/^\/|\/$/g, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${BASE}${prefix}/${clean ? `${clean}/` : ''}`;
};

/** URL for a file in /public. */
export const asset = (path: string): string => `${BASE}/${path.replace(/^\//, '')}`;

/** Strip base and language prefix from a pathname, giving the route key. */
export const routeKey = (pathname: string): string => {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  p = p.replace(/^\/it(\/|$)/, '/');
  return p.replace(/^\/|\/$/g, '');
};
