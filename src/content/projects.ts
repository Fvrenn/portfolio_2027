import type { Localized } from '@/i18n/locale'

export interface ProjectScreenshot {
  src: string
  alt: string
}

export interface Project {
  slug: string
  stage: string
  altitude: string
  title: string
  url: string
  problem: string
  result: string
  stack: string[]
  href: string
  screenshot: ProjectScreenshot
}

const PROJECT_FACTS = {
  first: { slug: 'projet-1', url: 'projet.fr', stack: ['React', 'TypeScript'], href: '', screenshotSrc: '' },
  second: { slug: 'projet-2', url: 'projet.fr', stack: ['Node.js', 'PostgreSQL'], href: '', screenshotSrc: '' },
  portfolio: { slug: 'portfolio', url: 'timothe.dev', stack: ['React', 'TypeScript', 'GSAP', 'Tailwind'], href: '', screenshotSrc: '/images/projects/portfolio.webp' },
}

type ProjectFacts = (typeof PROJECT_FACTS)[keyof typeof PROJECT_FACTS]
type ProjectText = Pick<Project, 'stage' | 'altitude' | 'title' | 'problem' | 'result'> & { screenshotAlt: string }

const toProject = ({ screenshotSrc, ...facts }: ProjectFacts, { screenshotAlt, ...text }: ProjectText): Project => ({
  ...facts,
  ...text,
  screenshot: { src: screenshotSrc, alt: screenshotAlt },
})

const WALKER_IMAGE = '/images/parcours/walker.webp'

const MAP_PLACE_POSITIONS = [
  { xPercent: 62, yPercent: 7 },
  { xPercent: 3, yPercent: 38 },
  { xPercent: 76, yPercent: 61 },
  { xPercent: 4, yPercent: 86 },
]

const toPlaces = (names: string[]) => names.map((name, i) => ({ name, ...MAP_PLACE_POSITIONS[i] }))

const fr = {
  eyebrow: 'Midi · Le sentier',
  title: 'Projets',
  intro: "Chaque étape raconte un produit : le problème de départ, ce que j'ai construit pour le résoudre et ce que ça a changé.",
  resultLabel: 'Résultat',
  linkLabel: "Voir l'itinéraire",
  markerLabel: 'Vous êtes ici',
  walkerImage: WALKER_IMAGE,
  screenshotPlaceholder: 'Capture à venir',
  map: {
    scaleLabel: '500 m',
    northLabel: 'N',
    places: toPlaces(['Crête du Front-end', 'Vallon des API', 'Forêt des Composants', 'Pic du Déploiement']),
  },
  projects: [
    toProject(PROJECT_FACTS.first, {
      stage: 'Étape 01',
      altitude: '1\u202f450\u00a0m',
      title: 'Nom du projet',
      problem: 'Le problème résolu, et pour qui, en une phrase compréhensible par une personne non technique.',
      result: 'Le résultat concret : utilisateurs, temps gagné, retours, mise en production…',
      screenshotAlt: "Page d'accueil du projet",
    }),
    toProject(PROJECT_FACTS.second, {
      stage: 'Étape 02',
      altitude: '1\u202f980\u00a0m',
      title: 'Nom du projet',
      problem: 'Le problème résolu, et pour qui, en une phrase compréhensible par une personne non technique.',
      result: 'Le résultat concret : utilisateurs, temps gagné, retours, mise en production…',
      screenshotAlt: "Page d'accueil du projet",
    }),
    toProject(PROJECT_FACTS.portfolio, {
      stage: 'Étape 03',
      altitude: '2\u202f540\u00a0m',
      title: 'Ce portfolio',
      problem: "Présenter mon travail à des recruteurs en moins d'une minute, avec une identité mémorable.",
      result: 'Paysage peint en parallaxe, boussole interactive, code public suivant un guide de qualité.',
      screenshotAlt: 'Hero du portfolio : randonneur face aux montagnes',
    }),
  ],
}

const en: typeof fr = {
  eyebrow: 'Midday · The trail',
  title: 'Projects',
  intro: 'Each stage tells the story of a product: the starting problem, what I built to solve it and what it changed.',
  resultLabel: 'Outcome',
  linkLabel: 'See the route',
  markerLabel: 'You are here',
  walkerImage: WALKER_IMAGE,
  screenshotPlaceholder: 'Screenshot coming soon',
  map: {
    scaleLabel: '500 m',
    northLabel: 'N',
    places: toPlaces(['Front-end Ridge', 'API Valley', 'Component Forest', 'Deployment Peak']),
  },
  projects: [
    toProject(PROJECT_FACTS.first, {
      stage: 'Stage 01',
      altitude: '1,450\u00a0m',
      title: 'Project name',
      problem: 'The problem solved, and for whom, in one sentence a non-technical person can follow.',
      result: 'The concrete outcome: users, time saved, feedback, release…',
      screenshotAlt: 'Project home page',
    }),
    toProject(PROJECT_FACTS.second, {
      stage: 'Stage 02',
      altitude: '1,980\u00a0m',
      title: 'Project name',
      problem: 'The problem solved, and for whom, in one sentence a non-technical person can follow.',
      result: 'The concrete outcome: users, time saved, feedback, release…',
      screenshotAlt: 'Project home page',
    }),
    toProject(PROJECT_FACTS.portfolio, {
      stage: 'Stage 03',
      altitude: '2,540\u00a0m',
      title: 'This portfolio',
      problem: 'Show my work to recruiters in under a minute, with a memorable identity.',
      result: 'Painted parallax landscape, interactive compass, public code following a written quality guide.',
      screenshotAlt: 'Portfolio hero: a hiker facing the mountains',
    }),
  ],
}

export const projectsContent: Localized<typeof fr> = { fr, en }
