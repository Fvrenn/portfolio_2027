import type { Localized } from '@/i18n/locale'

export const LANDMARK_IDS = ['lake', 'forest', 'waterfall', 'hamlet', 'glacier'] as const
export type LandmarkId = (typeof LANDMARK_IDS)[number]

export interface ProjectFeature {
  landmark: LandmarkId
  title: string
  text: string
  screenshot: { src: string; alt: string }
}

export interface ProjectDecision {
  choice: string
  alternative: string
  reason: string
}

export interface ProjectReading {
  value: number
  unit: string
  label: string
}

export type ShotFormat = 'desktop' | 'mobile'

export interface GalleryShot {
  src: string
  format: ShotFormat
  caption: string
  alt: string
}

export interface ProjectLinks {
  demo: string
  code: string
  live: string
}

export interface ProjectDetail {
  oneLiner: string
  audience: string
  role: string
  duration: string
  outcome: string
  problem: string[]
  features: ProjectFeature[]
  gallery: GalleryShot[]
  decisions: ProjectDecision[]
  readings: ProjectReading[]
  learned: string
  links: ProjectLinks
  video: string
}

interface DetailFacts {
  links: ProjectLinks
  video: string
  screenshots: Record<LandmarkId, string>
  gallery: Pick<GalleryShot, 'src' | 'format'>[]
  readingValues: number[]
}

type DetailText = Omit<ProjectDetail, 'features' | 'gallery' | 'readings' | 'links' | 'video'> & {
  features: Omit<ProjectFeature, 'landmark' | 'screenshot'>[]
  screenshotAlt: string
  gallery: Pick<GalleryShot, 'caption' | 'alt'>[]
  readings: Omit<ProjectReading, 'value'>[]
}

const NO_SCREENSHOTS: Record<LandmarkId, string> = { lake: '', forest: '', waterfall: '', hamlet: '', glacier: '' }
const NO_LINKS: ProjectLinks = { demo: '', code: '', live: '' }
const EXAMPLE_READING_VALUES = [128, 35, 12]
const PLACEHOLDER_GALLERY: DetailFacts['gallery'] = [
  { src: '', format: 'desktop' },
  { src: '', format: 'desktop' },
  { src: '', format: 'mobile' },
  { src: '', format: 'desktop' },
  { src: '', format: 'mobile' },
  { src: '', format: 'desktop' },
]

const PORTFOLIO_SHOTS_DIR = '/images/projects/portfolio'
const toPortfolioShot = (name: string) => `${PORTFOLIO_SHOTS_DIR}/${name}.webp`

const DETAIL_FACTS = {
  first: { links: NO_LINKS, video: '', screenshots: NO_SCREENSHOTS, gallery: PLACEHOLDER_GALLERY, readingValues: EXAMPLE_READING_VALUES },
  second: { links: NO_LINKS, video: '', screenshots: NO_SCREENSHOTS, gallery: PLACEHOLDER_GALLERY, readingValues: EXAMPLE_READING_VALUES },
  portfolio: {
    links: NO_LINKS,
    video: '',
    screenshots: {
      lake: toPortfolioShot('hero'),
      forest: toPortfolioShot('sentier'),
      waterfall: toPortfolioShot('sac'),
      hamlet: toPortfolioShot('parcours'),
      glacier: toPortfolioShot('sommet'),
    },
    gallery: [
      { src: toPortfolioShot('hero'), format: 'desktop' },
      { src: toPortfolioShot('sac'), format: 'desktop' },
      { src: toPortfolioShot('mobile-hero'), format: 'mobile' },
      { src: toPortfolioShot('parcours'), format: 'desktop' },
      { src: toPortfolioShot('bivouac'), format: 'desktop' },
      { src: toPortfolioShot('mobile-sommet'), format: 'mobile' },
      { src: toPortfolioShot('sommet'), format: 'desktop' },
    ],
    readingValues: EXAMPLE_READING_VALUES,
  },
} satisfies Record<string, DetailFacts>

const toDetail = (facts: DetailFacts, { features, screenshotAlt, gallery, readings, ...text }: DetailText): ProjectDetail => ({
  ...text,
  gallery: facts.gallery.map((shot, i) => ({ ...shot, ...gallery[Math.min(i, gallery.length - 1)] })),
  links: facts.links,
  video: facts.video,
  features: features.map((feature, i) => ({
    ...feature,
    landmark: LANDMARK_IDS[i],
    screenshot: { src: facts.screenshots[LANDMARK_IDS[i]], alt: screenshotAlt },
  })),
  readings: readings.map((reading, i) => ({ ...reading, value: facts.readingValues[i] })),
})

const FR_GUIDE: DetailText = {
  oneLiner:
    "[Une phrase : ce que fait le produit et pour qui, compréhensible par une personne non technique. Ex. : « Un outil qui aide les bénévoles d'une association à organiser leurs permanences. »]",
  audience: '[Qui l’utilise : métier, nombre, contexte]',
  role: '[Ton rôle exact : seul ou en équipe, ce que tu as pris en charge]',
  duration: '[Durée et période, ex. 3 mois, 2025]',
  outcome: '[Le résultat principal en quelques mots, avec un chiffre réel]',
  problem: [
    "[2 ou 3 phrases : ce qui n'allait pas avant le projet, pour qui, et pourquoi ça comptait. Aucun mot technique ici.]",
    '[Une phrase sur ce que les utilisateurs faisaient à la place : tableur, papier, outil inadapté…]',
  ],
  features: [1, 2, 3, 4, 5].map((n) => ({
    title: `[Fonctionnalité clé n° ${n}]`,
    text: "[Une ou deux phrases : ce que l'utilisateur peut faire et ce que ça lui apporte. Commence par le bénéfice, pas par la technique.]",
  })),
  screenshotAlt: '[Description courte de la capture]',
  gallery: [
    {
      caption: '[Légende courte : ce que montre la capture, ex. « Le tableau de bord des chefs »]',
      alt: '[Description de la capture pour les lecteurs d’écran]',
    },
  ],
  decisions: [1, 2, 3].map((n) => ({
    choice: `[Décision n° ${n} : ce que tu as choisi]`,
    alternative: "[L'option que tu as écartée]",
    reason:
      "[Pourquoi : la contrainte, l'utilisateur, le compromis accepté. C'est ici que le recruteur voit ton jugement, sois concret.]",
  })),
  readings: [
    { unit: '', label: '[Exemple à remplacer par un vrai chiffre : utilisateurs actifs]' },
    { unit: 'h', label: '[Exemple à remplacer : heures gagnées par mois]' },
    { unit: '', label: '[Exemple à remplacer : retours utilisateurs intégrés]' },
  ],
  learned:
    "[2 ou 3 phrases honnêtes : ce que tu as appris, une erreur corrigée en route, ce que tu ferais autrement aujourd'hui.]",
}

const EN_GUIDE: DetailText = {
  oneLiner:
    '[One sentence: what the product does and for whom, clear to a non-technical reader. E.g. “A tool that helps a non-profit’s volunteers schedule their shifts.”]',
  audience: '[Who uses it: job, number, context]',
  role: '[Your exact role: solo or in a team, what you owned]',
  duration: '[Duration and period, e.g. 3 months, 2025]',
  outcome: '[The main outcome in a few words, with a real figure]',
  problem: [
    '[2 or 3 sentences: what was wrong before the project, for whom, and why it mattered. No technical words here.]',
    '[One sentence on what users did instead: spreadsheet, paper, ill-suited tool…]',
  ],
  features: [1, 2, 3, 4, 5].map((n) => ({
    title: `[Key feature #${n}]`,
    text: '[One or two sentences: what the user can do and what it gives them. Lead with the benefit, not the tech.]',
  })),
  screenshotAlt: '[Short description of the screenshot]',
  gallery: [
    {
      caption: '[Short caption: what the screenshot shows, e.g. “The leaders’ dashboard”]',
      alt: '[Description of the screenshot for screen readers]',
    },
  ],
  decisions: [1, 2, 3].map((n) => ({
    choice: `[Decision #${n}: what you chose]`,
    alternative: '[The option you ruled out]',
    reason: '[Why: the constraint, the user, the trade-off you accepted. This is where recruiters see your judgment, be concrete.]',
  })),
  readings: [
    { unit: '', label: '[Example, replace with a real figure: active users]' },
    { unit: 'h', label: '[Example to replace: hours saved per month]' },
    { unit: '', label: '[Example to replace: user feedback shipped]' },
  ],
  learned: '[2 or 3 honest sentences: what you learned, a mistake you fixed along the way, what you would do differently today.]',
}

const fr: Record<string, ProjectDetail> = {
  'projet-1': toDetail(DETAIL_FACTS.first, FR_GUIDE),
  'projet-2': toDetail(DETAIL_FACTS.second, FR_GUIDE),
  portfolio: toDetail(DETAIL_FACTS.portfolio, FR_GUIDE),
}

const en: typeof fr = {
  'projet-1': toDetail(DETAIL_FACTS.first, EN_GUIDE),
  'projet-2': toDetail(DETAIL_FACTS.second, EN_GUIDE),
  portfolio: toDetail(DETAIL_FACTS.portfolio, EN_GUIDE),
}

export const projectDetailsContent: Localized<typeof fr> = { fr, en }
