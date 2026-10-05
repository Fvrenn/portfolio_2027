import type { Localized } from '@/i18n/locale'

const REPOSITORY_URL = 'https://github.com/Fvrenn/portfolio_2027'
const CODE_GUIDE_URL = `${REPOSITORY_URL}/blob/main/GUIDE-CODE-PROPRE.md`
const SOURCE_ROOT = 'src/'

const fr = {
  title: 'Le carnet de bord',
  intro: 'Le code de ce site, tel qu’il est rangé.',
  root: SOURCE_ROOT,
  folders: [
    { name: 'content/', role: 'Les textes, en français et en anglais' },
    { name: 'components/', role: "L'affichage, en petits blocs" },
    { name: 'hooks/', role: 'Les animations et les effets' },
    { name: 'lib/', role: 'Les calculs : courbes de niveau, sentier' },
    { name: 'i18n/', role: 'La langue du site' },
  ],
  proofsTitle: 'À vérifier soi-même',
  proofs: [
    'TypeScript en mode strict : le build échoue à la moindre erreur de type.',
    'Un guide de code écrit, suivi par moi comme par les agents IA.',
    'Aucun texte dans les composants : tout le contenu est séparé et bilingue.',
  ],
  links: [
    { label: 'Voir le code', href: REPOSITORY_URL },
    { label: 'Lire le guide de code', href: CODE_GUIDE_URL },
  ],
}

const en: typeof fr = {
  title: 'The logbook',
  intro: 'The code of this site, as it is organised.',
  root: SOURCE_ROOT,
  folders: [
    { name: 'content/', role: 'Text, in French and English' },
    { name: 'components/', role: 'Display, in small blocks' },
    { name: 'hooks/', role: 'Animations and effects' },
    { name: 'lib/', role: 'Calculations: contour lines, trail' },
    { name: 'i18n/', role: 'Site language' },
  ],
  proofsTitle: 'Check it yourself',
  proofs: [
    'Strict TypeScript: the build fails on any type error.',
    'A written code guide, followed by me and by AI agents alike.',
    'No text inside components: all content is separate and bilingual.',
  ],
  links: [
    { label: 'Browse the code', href: REPOSITORY_URL },
    { label: 'Read the code guide', href: CODE_GUIDE_URL },
  ],
}

export const logbookContent: Localized<typeof fr> = { fr, en }
