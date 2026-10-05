import type { Localized } from '@/i18n/locale'

const fr = {
  eyebrow: 'Matin · Le départ · 1\u202f050\u00a0m',
  statement:
    "J'aime créer des produits. Le code est mon outil pour leur donner vie : comprendre le besoin, imaginer la bonne solution, la livrer, puis l'améliorer avec celles et ceux qui l'utilisent.",
  aside:
    "Je m'investis dans le produit autant que dans le code : le problème qu'il résout, ce qu'il propose, ce qui le fait avancer. La qualité se prépare en amont, et l'IA m'aide à aller plus vite sans jamais décider à ma place.",
}

const en: typeof fr = {
  eyebrow: 'Morning · The start · 1,050\u00a0m',
  statement:
    'I love building products. Code is how I bring them to life: understand the need, shape the right solution, ship it, then improve it with the people who use it.',
  aside:
    'I care about the product as much as the code: the problem it solves, what it offers, what moves it forward. Quality is planned upfront, and AI helps me move faster without ever deciding for me.',
}

export const approachContent: Localized<typeof fr> = { fr, en }
