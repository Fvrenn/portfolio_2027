import type { Localized } from '@/i18n/locale'
import { SECTION_IDS, toAnchor } from './sections'

const fr = {
  eyebrow: 'Bonjour, je suis Timothé',
  srTitle: 'Timothé, développeur web qui crée des produits —',
  verticalLabel: 'PRODUIT / CODE / SOMMETS',
  line1: 'Un dev qui',
  rollingWords: ['Crée', 'Livre', 'Code', 'Marche'],
  compass: {
    headingLabel: 'Cap',
    cardinalPoints: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'],
    waypoints: [
      { bearingDeg: 0, label: 'Prochaine étape', title: 'Vous rejoindre ?', detail: 'Ouvert aux opportunités', href: toAnchor(SECTION_IDS.contact) },
      { bearingDeg: 90, label: 'Le sentier', title: 'Mes projets', detail: 'Produits et résultats', href: toAnchor(SECTION_IDS.projects) },
      { bearingDeg: 180, label: 'Le sac', title: 'Ma méthode', detail: 'Produit, qualité, IA', href: toAnchor(SECTION_IDS.method) },
      { bearingDeg: 270, label: 'Le départ', title: 'Mon approche', detail: 'Qui je suis, en bref', href: toAnchor(SECTION_IDS.approach) },
    ],
  },
}

const en: typeof fr = {
  eyebrow: "Hi, I'm Timothé —",
  srTitle: 'Timothé, a web developer who builds products —',
  verticalLabel: 'PRODUCT / CODE / SUMMITS',
  line1: 'Developer who',
  rollingWords: ['Creates', 'Ships', 'Codes', 'Climbs'],
  compass: {
    headingLabel: 'Bearing',
    cardinalPoints: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    waypoints: [
      { bearingDeg: 0, label: 'Next step', title: 'Join your team?', detail: 'Open to opportunities', href: toAnchor(SECTION_IDS.contact) },
      { bearingDeg: 90, label: 'The trail', title: 'My projects', detail: 'Products and outcomes', href: toAnchor(SECTION_IDS.projects) },
      { bearingDeg: 180, label: 'The pack', title: 'My method', detail: 'Product, quality, AI', href: toAnchor(SECTION_IDS.method) },
      { bearingDeg: 270, label: 'The start', title: 'My approach', detail: 'Who I am, in short', href: toAnchor(SECTION_IDS.approach) },
    ],
  },
}

export const heroContent: Localized<typeof fr> = { fr, en }
