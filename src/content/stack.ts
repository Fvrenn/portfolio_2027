import type { Localized } from '@/i18n/locale'

const STACK_TOOLS = {
  daily: ['TypeScript', 'React', 'Tailwind', 'Git'],
  project: ['Vite', 'GSAP', 'Node.js', 'PostgreSQL'],
  exploring: ['Vitest', 'GitHub Actions'],
}

const fr = {
  title: 'Le matériel',
  intro: "Pas de niveaux inventés : les outils sont rangés selon l'usage que j'en fais. Survolez-en un pour voir où je m'en suis servi.",
  usedInLabel: 'Utilisé dans',
  groups: [
    { id: 'daily', label: 'Au quotidien', tools: STACK_TOOLS.daily },
    { id: 'project', label: 'Utilisé en projet', tools: STACK_TOOLS.project },
    { id: 'exploring', label: 'En exploration', tools: STACK_TOOLS.exploring },
  ],
}

const en: typeof fr = {
  title: 'The gear',
  intro: 'No made-up skill levels: tools are sorted by how I actually use them. Hover one to see where I used it.',
  usedInLabel: 'Used in',
  groups: [
    { id: 'daily', label: 'Every day', tools: STACK_TOOLS.daily },
    { id: 'project', label: 'Used in projects', tools: STACK_TOOLS.project },
    { id: 'exploring', label: 'Exploring', tools: STACK_TOOLS.exploring },
  ],
}

export const stackContent: Localized<typeof fr> = { fr, en }
