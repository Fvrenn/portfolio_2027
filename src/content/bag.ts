import type { Localized } from '@/i18n/locale'

export interface BagItem {
  id: string
  object: string
  image: string
  title: string
  text: string
  proof: string
}

const BAG_IMAGES = {
  open: '/images/bag/bag-open.webp',
  closed: '/images/bag/bag-closed.webp',
  map: '/images/bag/map.webp',
  rope: '/images/bag/rope.webp',
  headlamp: '/images/bag/headlamp.webp',
  tent: '/images/bag/tent.webp',
}

type GearId = 'map' | 'rope' | 'headlamp' | 'tent'
type BagItemText = Omit<BagItem, 'id' | 'image'>

const toItem = (id: GearId, text: BagItemText): BagItem => ({ id, image: BAG_IMAGES[id], ...text })

const fr = {
  eyebrow: 'Le sac',
  title: 'Ce que je mets dans mon sac',
  intro: "Quatre réflexes que j'emporte sur chaque projet.",
  imageAlt: 'Mon sac de randonnée orange',
  openImage: BAG_IMAGES.open,
  closedImage: BAG_IMAGES.closed,
  items: [
    toItem('map', {
      object: 'La carte',
      title: 'Partir du produit',
      text: "Avant de coder, je comprends à qui s'adresse le produit, quel problème il règle et ce qui fera sa réussite.",
      proof: 'Conventions et critères de réussite sont posés en amont, pas corrigés après.',
    }),
    toItem('rope', {
      object: 'La corde',
      title: "L'IA, assurée à chaque pas",
      text: "J'utilise des agents de code pour aller plus vite, mais je relis, je teste et je décide de ce qui part en production.",
      proof: "Les règles données à l'IA sont versionnées avec le code.",
    }),
    toItem('headlamp', {
      object: 'La frontale',
      title: 'Voir au-delà de la mise en ligne',
      text: "Un produit n'est pas fini quand il est déployé : je regarde comment il est utilisé, ce qui bloque, et je l'améliore.",
      proof: 'Retours utilisateurs, erreurs et usages guident les itérations.',
    }),
    toItem('tent', {
      object: 'La tente',
      title: 'Monter le camp en équipe',
      text: 'Expliquer un choix simplement, poser les bonnes questions, prévenir tôt quand ça coince.',
      proof: "L'encadrement en scoutisme m'a appris à organiser et à décider en équipe.",
    }),
  ],
}

const en: typeof fr = {
  eyebrow: 'The pack',
  title: 'What I carry in my pack',
  intro: 'Four habits I bring to every project.',
  imageAlt: 'My orange hiking backpack',
  openImage: BAG_IMAGES.open,
  closedImage: BAG_IMAGES.closed,
  items: [
    toItem('map', {
      object: 'The map',
      title: 'Start from the product',
      text: 'Before coding, I make sure I understand who the product is for, what problem it solves and what success looks like.',
      proof: 'Conventions and success criteria are set upfront, not patched afterwards.',
    }),
    toItem('rope', {
      object: 'The rope',
      title: 'AI, belayed at every step',
      text: 'I use coding agents to move faster, but I review, test and decide what goes to production.',
      proof: 'The rules given to the AI are versioned with the code.',
    }),
    toItem('headlamp', {
      object: 'The headlamp',
      title: 'See beyond the launch',
      text: "A product isn't done once it's deployed: I watch how it's used, what gets in the way, and I improve it.",
      proof: 'User feedback, errors and usage drive each iteration.',
    }),
    toItem('tent', {
      object: 'The tent',
      title: 'Pitch camp as a team',
      text: 'Explain a choice simply, ask the right questions, raise a flag early when something is stuck.',
      proof: 'Leading scout groups taught me to organise and decide as a team.',
    }),
  ],
}

export const bagContent: Localized<typeof fr> = { fr, en }
