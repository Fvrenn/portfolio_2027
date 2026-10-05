import type { Localized } from '@/i18n/locale'

const fr = {
  eyebrow: 'Nuit · Le bivouac · 2\u202f900\u00a0m',
  title: 'On fait le point sur le matériel',
  intro: "Autour du feu, on vide le sac : les outils que j'utilise vraiment, et la façon dont je range mon code.",
}

const en: typeof fr = {
  eyebrow: 'Night · The bivouac · 2,900\u00a0m',
  title: 'Checking the gear',
  intro: 'By the fire, we empty the pack: the tools I actually use, and how I organise my code.',
}

export const bivouacContent: Localized<typeof fr> = { fr, en }
