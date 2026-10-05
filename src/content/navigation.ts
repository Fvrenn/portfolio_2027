import type { Localized } from '@/i18n/locale'
import { SECTION_IDS, toAnchor } from './sections'

const fr = {
  documentTitle: 'Timothé — Développeur web, créateur de produits',
  name: 'Timothé',
  initial: 'T',
  homeLabel: "Retour à l'accueil",
  languageLabel: 'Langue du site',
  links: [
    { label: 'Approche', href: toAnchor(SECTION_IDS.approach) },
    { label: 'Projets', href: toAnchor(SECTION_IDS.projects) },
    { label: 'Méthode', href: toAnchor(SECTION_IDS.method) },
    { label: 'Parcours', href: toAnchor(SECTION_IDS.journey) },
    { label: 'Matériel', href: toAnchor(SECTION_IDS.gear) },
  ],
  cta: { label: 'Me contacter', href: toAnchor(SECTION_IDS.contact) },
}

const en: typeof fr = {
  documentTitle: 'Timothé — Web developer & product builder',
  name: 'Timothé',
  initial: 'T',
  homeLabel: 'Back to top',
  languageLabel: 'Site language',
  links: [
    { label: 'Approach', href: toAnchor(SECTION_IDS.approach) },
    { label: 'Projects', href: toAnchor(SECTION_IDS.projects) },
    { label: 'Method', href: toAnchor(SECTION_IDS.method) },
    { label: 'Journey', href: toAnchor(SECTION_IDS.journey) },
    { label: 'Gear', href: toAnchor(SECTION_IDS.gear) },
  ],
  cta: { label: 'Get in touch', href: toAnchor(SECTION_IDS.contact) },
}

export const navigationContent: Localized<typeof fr> = { fr, en }
