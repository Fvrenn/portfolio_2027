import type { Localized } from '@/i18n/locale'
import { SECTION_IDS, toAnchor } from './sections'

const EDUCATION_STEP_SPANS = { bachelor: 3, master: 2 }
const SCOUTING_PROJECT_HREF = toAnchor(SECTION_IDS.projects)

const fr = {
  eyebrow: "Fin d'après-midi · Le refuge · 2\u202f800\u00a0m",
  title: 'Le chemin parcouru',
  intro:
    "Quatre ans chez Trialog, du premier stage à l'alternance en master : à chaque étape, on m'a proposé de revenir, avec un peu plus de responsabilités.",
  company: {
    name: 'Trialog',
    description:
      "Trialog conçoit des outils pour tester la recharge des véhicules électriques : vérifier qu'une voiture et une borne se comprennent et respectent les normes.",
  },
  steps: [
    {
      period: '2023',
      kind: 'Stage · 1 mois',
      product: 'ComboCS',
      text: "Refonte de l'interface d'un boîtier qui simule une borne de recharge ou un véhicule électrique, pour tester leur communication.",
    },
    {
      period: '2024',
      kind: 'Stage · 2 mois',
      product: 'ComboCS',
      text: "Retour sur le même produit, avec une fonctionnalité à prendre en main : l'envoi des certificats de sécurité.",
    },
    {
      period: '2024 – 2025',
      kind: 'Alternance · 1 an',
      product: 'OCPPVS',
      text: 'Refonte d’un logiciel qui simule des bornes virtuelles pour tester leur dialogue avec les systèmes de supervision : nouveau parcours utilisateur et premières nouveautés.',
    },
    {
      period: '2025 – 2026',
      kind: 'Alternance · master',
      product: 'OCPPVS',
      text: 'Création de la partie véhicule : simuler aussi des voitures électriques et les brancher aux bornes virtuelles, à partir de modèles configurables.',
    },
    {
      period: '2026 – 2027',
      kind: 'Alternance · en cours',
      product: 'OCPPVS · Troca',
      text: "Finaliser OCPPVS pour qu'il soit agréable à utiliser au quotidien, et travailler l'interface de Troca, un logiciel de supervision de bornes.",
    },
  ],
  educationLabel: 'En parallèle',
  education: [
    { period: '2022 – 2025', title: 'BUT Métiers du multimédia et de l’internet', school: 'Université Gustave Eiffel', span: EDUCATION_STEP_SPANS.bachelor },
    { period: '2025 – 2027', title: 'Mastère Dev Manager Full Stack', school: 'Efrei', span: EDUCATION_STEP_SPANS.master },
  ],
  scouting: {
    eyebrow: 'À côté du code',
    title: 'Animateur scout depuis 2020',
    facts: [
      "J'encadre des collégiens en week-end et en camp : 3 animateurs pour 16 jeunes, jusqu'à 8 pour 34 en camp.",
      "Je fais partie de l'équipe régionale.",
      'Dans la commission outils numériques, on conçoit des solutions qui simplifient la vie des chefs et des parents, et on partage ressources et documents.',
    ],
    takeaway: 'Au travail, ça se voit : organiser, déléguer, et décider en équipe quand le plan change.',
    linkLabel: "Voir l'outil que j'ai créé pour les chefs",
    href: SCOUTING_PROJECT_HREF,
  },
}

const en: typeof fr = {
  eyebrow: 'Late afternoon · The hut · 2,800\u00a0m',
  title: 'The road so far',
  intro:
    'Four years at Trialog, from my first internship to a work-study master: at every step, they asked me back, with a bit more responsibility.',
  company: {
    name: 'Trialog',
    description:
      'Trialog builds tools to test electric vehicle charging: making sure a car and a charging station understand each other and meet the standards.',
  },
  steps: [
    {
      period: '2023',
      kind: 'Internship · 1 month',
      product: 'ComboCS',
      text: 'Redesigned the interface of a device that simulates a charging station or an electric vehicle, to test how they communicate.',
    },
    {
      period: '2024',
      kind: 'Internship · 2 months',
      product: 'ComboCS',
      text: 'Back on the same product, owning one feature: uploading security certificates.',
    },
    {
      period: '2024 – 2025',
      kind: 'Work-study · 1 year',
      product: 'OCPPVS',
      text: 'Rebuilt a tool that simulates virtual charging stations to test how they talk to management systems: a new user journey and the first new features.',
    },
    {
      period: '2025 – 2026',
      kind: 'Work-study · master',
      product: 'OCPPVS',
      text: 'Built the vehicle side: simulating electric cars too and plugging them into virtual stations, from configurable models.',
    },
    {
      period: '2026 – 2027',
      kind: 'Work-study · ongoing',
      product: 'OCPPVS · Troca',
      text: 'Polishing OCPPVS so it is pleasant to use every day, and working on the interface of Troca, a charging station management system.',
    },
  ],
  educationLabel: 'Alongside',
  education: [
    { period: '2022 – 2025', title: 'Bachelor in Multimedia and Internet (BUT MMI)', school: 'Université Gustave Eiffel', span: EDUCATION_STEP_SPANS.bachelor },
    { period: '2025 – 2027', title: 'Master in Full Stack Development & Management', school: 'Efrei', span: EDUCATION_STEP_SPANS.master },
  ],
  scouting: {
    eyebrow: 'Beyond code',
    title: 'Scout leader since 2020',
    facts: [
      'I lead groups of 11 to 15 year olds on weekends and camps: 3 leaders for 16 kids, up to 8 for 34 at camp.',
      "I'm part of the regional team.",
      'In the digital tools committee, we design solutions that make life easier for leaders and parents, and share resources and documents.',
    ],
    takeaway: 'It shows at work: organising, delegating, and deciding as a team when plans change.',
    linkLabel: 'See the tool I built for leaders',
    href: SCOUTING_PROJECT_HREF,
  },
}

export const journeyContent: Localized<typeof fr> = { fr, en }
