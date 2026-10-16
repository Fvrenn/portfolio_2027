import type { Localized } from '@/i18n/locale'
import { PATCH_IMAGES, type PatchId } from './aboutImages'
import { SECTION_IDS, toAnchor } from './sections'

export interface Snapshot {
  src: string
  alt: string
  caption: string
}

export interface MapStep {
  period: string
  title: string
  text: string
}

export interface SkillPatch {
  patch: PatchId
  image: string
  skill: string
  proof: string
}

export interface ExpeditionStat {
  value: number
  unit: string
  label: string
}

export interface CampNote {
  label: string
  title: string
  text: string
}

const MAX_SNAPSHOTS = 6
const EXPEDITION_VALUES = { distanceKm: 240, summitM: 3096, days: 2, eclipses: 1 }

const toPatch = (patch: PatchId, skill: string, proof: string): SkillPatch => ({ patch, image: PATCH_IMAGES[patch], skill, proof })
const toSnapshots = (caption: string, alt: string): Snapshot[] =>
  Array.from({ length: MAX_SNAPSHOTS }, () => ({ src: '', alt, caption }))

const fr = {
  documentTitle: 'À propos, Timothé',
  hero: {
    eyebrow: 'Le camp de base · 1 050 m',
    title: "Au collège, je créais des visuels et je montais des vidéos pour des youtubeurs. Aujourd'hui, je crée des produits.",
    bio: [
      "J'ai toujours aimé l'informatique et les jeux vidéo. Je bidouillais sur mon PC bien avant de savoir coder ; les premières lignes sont arrivées en seconde, et depuis, le code est l'outil qui me permet de créer.",
      'Aujourd’hui, je suis en alternance chez Trialog et en mastère à l’Efrei. Le reste du temps, je suis en montagne ou en camp scout.',
    ],
    imageAlt: 'Timothé assis devant sa tente au camp de base, une tasse à la main',
  },
  clothesline: {
    eyebrow: 'Le fil à linge',
    title: 'Quelques souvenirs',
    photoPlaceholder: 'Photo à venir',
    photos: toSnapshots('[Légende courte et vraie, ex. « Au sommet du Buet »]', '[Description de la photo]'),
  },
  map: {
    eyebrow: 'La carte punaisée',
    title: "D'où je viens",
    steps: [
      {
        period: 'Collège',
        title: 'Les premiers bidouillages',
        text: 'Des visuels pour des youtubeurs, des montages vidéo : déjà l’envie de créer pour un vrai public.',
      },
      {
        period: 'Seconde',
        title: 'Les premières lignes de code',
        text: '[Ce que tu as codé en premier : un site, un jeu, un outil… et ce qui t’a donné envie de continuer.]',
      },
      {
        period: '2022 – 2025',
        title: 'BUT MMI, Université Gustave Eiffel',
        text: 'Le design, le développement et la gestion de projets web, avec mes deux premiers stages chez Trialog.',
      },
      {
        period: '2024 – 2027',
        title: 'Trialog et le mastère Efrei',
        text: 'Quatre ans dans la même entreprise, du stage à l’alternance, sur des outils qui testent la recharge des véhicules électriques.',
      },
    ],
    journeyLabel: 'Voir mon parcours en détail',
    journeyHref: toAnchor(SECTION_IDS.journey),
  },
  patches: {
    eyebrow: 'Les écussons',
    title: 'Ce que le scoutisme m’a appris',
    intro: 'Animateur depuis 2020 auprès des collégiens. Chaque écusson, c’est une compétence que je réutilise au travail.',
    items: [
      toPatch('tent', 'Encadrer', '3 animateurs pour 16 collégiens en week-end, jusqu’à 8 pour 34 en camp.'),
      toPatch('compass', 'Organiser', '[Ce que tu prépares : programme, logistique, sécurité des week-ends et des camps.]'),
      toPatch('fire', 'Animer', '[Une veillée, un grand jeu, un moment que tu as fait vivre au groupe.]'),
      toPatch('summit', 'Voir plus large', 'Membre de l’équipe régionale. [Ce que tu y fais.]'),
      toPatch('code', 'Outiller', 'Dans la commission outils numériques, j’ai développé l’outil qu’utilisent les chefs de toute la France pour valider la progression des animateurs.'),
      toPatch('bike', 'Tenir la distance', '240 km à vélo puis le Mont Buet en deux jours, avec d’autres chefs.'),
    ],
  },
  camp: {
    eyebrow: 'En ce moment au camp',
    title: 'Hors du code',
    expedition: {
      label: 'La dernière expédition',
      title: 'Mont Buet',
      text: 'Un camp de chefs : 240 km à vélo, puis l’ascension du Mont Buet en deux jours, sous l’éclipse. [Ton rôle, la date, une anecdote.]',
      photoPlaceholder: 'Photo à venir',
      photos: toSnapshots('[Légende]', '[Description de la photo]').slice(0, 3),
      stats: [
        { value: EXPEDITION_VALUES.distanceKm, unit: 'km', label: 'à vélo' },
        { value: EXPEDITION_VALUES.summitM, unit: 'm', label: 'au sommet' },
        { value: EXPEDITION_VALUES.days, unit: '', label: 'jours' },
        { value: EXPEDITION_VALUES.eclipses, unit: '', label: 'éclipse' },
      ],
    },
    notes: [
      { label: 'En ce moment', title: 'J’apprends', text: '[Ce que tu apprends en ce moment, et pourquoi.]' },
      { label: 'Dans mon carnet', title: 'Une phrase', text: '[Une citation qui te guide, avec son auteur.]' },
      {
        label: 'Pour le plaisir',
        title: 'Le dernier truc codé',
        text: 'Les courbes de niveau de ce site sont générées en code, à partir de bruit : aucune n’est dessinée à la main.',
      },
      { label: 'Dans mes écouteurs', title: 'Pour marcher', text: '[Un album, un podcast ou une playlist de rando.]' },
    ],
  },
  departure: {
    eyebrow: 'Prochain départ',
    title: 'Et si on préparait la prochaine sortie ensemble ?',
    text: '[Ce que tu recherches : type de contrat, rythme, zone géographique.]',
    contactLabel: 'Me contacter',
    contactHref: toAnchor(SECTION_IDS.contact),
    projectsLabel: 'Voir mes projets',
    projectsHref: toAnchor(SECTION_IDS.projects),
  },
}

const en: typeof fr = {
  documentTitle: 'About, Timothé',
  hero: {
    eyebrow: 'Base camp · 1,050 m',
    title: 'In middle school, I made visuals and edited videos for YouTubers. Today, I build products.',
    bio: [
      'I have always loved computers and video games. I was tinkering on my PC long before I could code; my first lines came in high school, and since then code has been the tool that lets me build things.',
      'Today I am a work-study developer at Trialog and a master’s student at Efrei. The rest of the time, I am in the mountains or at scout camp.',
    ],
    imageAlt: 'Timothé sitting in front of his tent at base camp, a mug in his hands',
  },
  clothesline: {
    eyebrow: 'The clothesline',
    title: 'A few memories',
    photoPlaceholder: 'Photo coming soon',
    photos: toSnapshots('[Short, true caption, e.g. “On top of the Buet”]', '[Description of the photo]'),
  },
  map: {
    eyebrow: 'The pinned map',
    title: 'Where I come from',
    steps: [
      {
        period: 'Middle school',
        title: 'First tinkering',
        text: 'Visuals for YouTubers, video edits: already the urge to make things for a real audience.',
      },
      {
        period: 'High school',
        title: 'First lines of code',
        text: '[What you coded first: a website, a game, a tool… and what made you keep going.]',
      },
      {
        period: '2022 – 2025',
        title: 'Bachelor in Multimedia and Internet',
        text: 'Design, development and web project management, with my first two internships at Trialog.',
      },
      {
        period: '2024 – 2027',
        title: 'Trialog and the Efrei master',
        text: 'Four years at the same company, from internship to work-study, on tools that test electric vehicle charging.',
      },
    ],
    journeyLabel: 'See my journey in detail',
    journeyHref: toAnchor(SECTION_IDS.journey),
  },
  patches: {
    eyebrow: 'The patches',
    title: 'What scouting taught me',
    intro: 'Scout leader since 2020 for 11 to 15 year olds. Each patch is a skill I use at work.',
    items: [
      toPatch('tent', 'Leading', '3 leaders for 16 kids on weekends, up to 8 for 34 at camp.'),
      toPatch('compass', 'Organising', '[What you prepare: programme, logistics, safety for weekends and camps.]'),
      toPatch('fire', 'Bringing people together', '[A campfire evening, a big game, a moment you made happen for the group.]'),
      toPatch('summit', 'Seeing the bigger picture', 'Member of the regional team. [What you do there.]'),
      toPatch('code', 'Building tools', 'In the digital tools committee, I built the tool leaders across France use to validate the progression of scout leaders.'),
      toPatch('bike', 'Going the distance', '240 km by bike then the Mont Buet in two days, with other leaders.'),
    ],
  },
  camp: {
    eyebrow: 'Right now at camp',
    title: 'Beyond code',
    expedition: {
      label: 'The latest expedition',
      title: 'Mont Buet',
      text: 'A leaders’ camp: 240 km by bike, then the Mont Buet in two days, under the eclipse. [Your role, the date, an anecdote.]',
      photoPlaceholder: 'Photo coming soon',
      photos: toSnapshots('[Caption]', '[Description of the photo]').slice(0, 3),
      stats: [
        { value: EXPEDITION_VALUES.distanceKm, unit: 'km', label: 'by bike' },
        { value: EXPEDITION_VALUES.summitM, unit: 'm', label: 'at the summit' },
        { value: EXPEDITION_VALUES.days, unit: '', label: 'days' },
        { value: EXPEDITION_VALUES.eclipses, unit: '', label: 'eclipse' },
      ],
    },
    notes: [
      { label: 'Right now', title: 'I am learning', text: '[What you are learning right now, and why.]' },
      { label: 'In my notebook', title: 'A quote', text: '[A quote that guides you, with its author.]' },
      {
        label: 'Just for fun',
        title: 'The latest thing I coded',
        text: 'The contour lines on this site are generated in code from noise: none of them is drawn by hand.',
      },
      { label: 'In my headphones', title: 'For the trail', text: '[An album, a podcast or a hiking playlist.]' },
    ],
  },
  departure: {
    eyebrow: 'Next departure',
    title: 'What if we planned the next trip together?',
    text: '[What you are looking for: contract type, work setup, location.]',
    contactLabel: 'Get in touch',
    contactHref: toAnchor(SECTION_IDS.contact),
    projectsLabel: 'See my projects',
    projectsHref: toAnchor(SECTION_IDS.projects),
  },
}

export type AboutContent = typeof fr

export const aboutContent: Localized<typeof fr> = { fr, en }
