/**
 * Talks and presentations. Slides are published Google Slides decks. Nothing
 * is requested from Google when a page loads: cards show local covers
 * (src/assets/talks/{slug}.jpg, made by scripts/make_talk_covers.py), "Open
 * slides" opens Google Slides in a new tab, and the embed is created only
 * after an explicit click in the preview dialog (src/views/Talks.astro).
 */
import type { L10n } from '../i18n/ui';

export interface Deck {
  title: L10n;
  year: string;
  /** Published deck id: the part after /presentation/d/e/ */
  deck: string;
}

export interface Talk {
  /** Stable id; also the cover file name. */
  slug: string;
  title: L10n;
  where: L10n;
  year: string;
  /** Published deck id (single-deck talks). */
  deck?: string;
  /** Several decks grouped in one card (no cover, no preview). */
  decks?: Deck[];
}

const eurecom: L10n = { en: 'EURECOM, France', it: 'EURECOM, Francia' };
const journalClub = (n: number): L10n => ({ en: `Journal club #${n}`, it: `Journal club n. ${n}` });

export const talks: Talk[] = [
  {
    slug: 'defence-2026',
    title: { en: 'PhD defence', it: 'Discussione della tesi' },
    where: eurecom,
    year: '2026',
    deck: '2PACX-1vQXnPc7adD-wnq2C0wZHswj6uzjBMGyHBK3tbRwl7afeZchymlFpqDTRc5Gf_kbsxLqgA3iab8SwIBj',
  },
  {
    slug: 'vesselverse-spotlight-2025',
    title: { en: 'VesselVerse, spotlight talk', it: 'VesselVerse, presentazione spotlight' },
    where: { en: 'MICCAI, South Korea', it: 'MICCAI, Corea del Sud' },
    year: '2025',
    deck: '2PACX-1vSxPSvDq1aH5LKOts7aPN-1F4Sfkq68RgRtQcg5c1bFJe1mLTKb4tkpK2k675U56kT5yZP5YYuLQBY8',
  },
  {
    slug: 'vizai-2025',
    title: { en: 'Invited talk', it: 'Intervento su invito' },
    where: { en: 'Viz.ai, Israel', it: 'Viz.ai, Israele' },
    year: '2025',
    deck: '2PACX-1vTYrbr9t0EC0UacUpQl7Bfrx7j5msE-V2Jp6kjwPmiWC-c7tgl6L-qg7RQq-Irhi8pofv4fWf6grw47',
  },
  {
    slug: 'vesselmetrics-2025',
    title: { en: 'VesselMetrics, 3D vessel morphometry', it: 'VesselMetrics, morfometria 3D dei vasi' },
    where: { en: 'GIN Grenoble, France', it: 'GIN Grenoble, Francia' },
    year: '2025',
    deck: '2PACX-1vSGJuSTOjUmQ2TEBkeQ14UMcfGJwIqfFJxMqTaW5mztRjUqtDRMLG5fqsw7yxnZMDoO1uaT87Kfx6Wo',
  },
  {
    slug: 'doctoral-consortium-2025',
    title: { en: 'Doctoral Consortium (finalist)', it: 'Doctoral Consortium (finalista)' },
    where: { en: 'MICCAI, South Korea', it: 'MICCAI, Corea del Sud' },
    year: '2025',
    deck: '2PACX-1vQrinup1JF9EVDbmdGsyW2uAR0AdWVBPxKoDgnyFVFapiGDNTmCGqqR3_2iSrAzZPs0qv5QSOxAIRji',
  },
  {
    slug: 'topcow-2023',
    title: { en: 'TopCoW challenge', it: 'Challenge TopCoW' },
    where: { en: 'MICCAI, Canada', it: 'MICCAI, Canada' },
    year: '2023',
    deck: '2PACX-1vTePDFWwS94SWu2TCoekbXPjLyE0PLxKy4Mqp0QgODgGNzPErOh29WTKlvI5Q37Hw',
  },
  {
    slug: 'seminars',
    title: { en: 'Seminars and journal clubs', it: 'Seminari e journal club' },
    where: { en: 'EURECOM and Inria, France', it: 'EURECOM e Inria, Francia' },
    year: '2023–2025',
    decks: [
      {
        title: { en: 'MICCAI 2025 highlights', it: 'Il meglio di MICCAI 2025' },
        year: '2025',
        deck: '2PACX-1vQT10BfnNM8LSSixg79cvswV2FhAPBp-D9GhMPyw7QE6hSL-bNwRdBmP0KiMOGxivC-Zn6HSbsyKv6v',
      },
      {
        title: { en: 'My MICCAI 2025', it: 'Il mio MICCAI 2025' },
        year: '2025',
        deck: '2PACX-1vRR8KPaIywpW3agdBaDRVw06iYMALI2HfCj8dAScSCTcWexEyZauFzPCrn5N1Eomy0ilegAzAEorrga',
      },
      {
        title: { en: 'VesselVerse, method presentation', it: 'VesselVerse, presentazione del metodo' },
        year: '2025',
        deck: '2PACX-1vQDYEFj5Y_hd1npuF4X0N821kfPmBd4KfDxr6FPAEIjPuqcY9XSQqdJgp07T063_kYeDN13Hs2Hj65v',
      },
      {
        title: journalClub(5),
        year: '2025',
        deck: '2PACX-1vTSC0zTpc30322hn-CjAFVcjn-Vpx4aC_Oml1LldEm-z4AoNytXY0B7b5vY3CId1-NiIlsIFNUq2-kq',
      },
      {
        title: journalClub(4),
        year: '2025',
        deck: '2PACX-1vRta81bkS2DV_HH8krp5BxqFsy7jZRQ1cWy4N7MZQYvVagVIBf0v9WoMvPCthWolXIwVvxvtaLl8Dwm',
      },
      {
        title: journalClub(3),
        year: '2024',
        deck: '2PACX-1vQH4v36S2ZLWjun9X03sLCNMY8Z2V33CnksURKbl9lGmJ130qTr_TZQUtliAEC_XkglfMbOug8_B3U8',
      },
      {
        title: journalClub(2),
        year: '2024',
        deck: '2PACX-1vT_Q4ee7s39C5SH_70ArDyKT7PkfdwfUXQCX7Np05M5RRWynaMt6G30xx29H4yyzZ-J5dOpigbMyV9A',
      },
      {
        title: journalClub(1),
        year: '2023',
        deck: '2PACX-1vQDuQNsuPRvSfh_uNYydfke9YaJSTZ7K7vH3xgkwUEi2nO2speM9zZo3Q3xGBfqXa7Lm77rh3atH_e4',
      },
    ],
  },
];

const base = 'https://docs.google.com/presentation/d/e/';
export const pubUrl = (deck: string) => `${base}${deck}/pub?start=false&loop=false&delayms=3000`;
export const embedUrl = (deck: string) => `${base}${deck}/embed?start=false&loop=false&delayms=3000`;
