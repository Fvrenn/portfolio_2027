import type { Localized } from '@/i18n/locale'

const CONTACT_LINKS = {
  email: '',
  linkedin: '',
  github: '',
  resume: '',
}

const YEAR = new Date().getFullYear()

const fr = {
  eyebrow: 'Aube · Le sommet · 3\u202f120\u00a0m',
  title: 'Et si la prochaine étape, on la faisait ensemble ?',
  seeking: 'Je recherche un poste de développeur web. Précise ici le type de contrat, le rythme (remote, hybride) et la zone géographique.',
  links: [
    { label: 'M’écrire', href: CONTACT_LINKS.email, isPrimary: true },
    { label: 'LinkedIn', href: CONTACT_LINKS.linkedin, isPrimary: false },
    { label: 'GitHub', href: CONTACT_LINKS.github, isPrimary: false },
    { label: 'CV (PDF)', href: CONTACT_LINKS.resume, isPrimary: false },
  ],
  footer: {
    signature: `© ${YEAR} Timothé`,
    madeWith: 'Conçu et codé à la main, avec React, GSAP et pas mal de dénivelé.',
  },
}

const en: typeof fr = {
  eyebrow: 'Dawn · The summit · 3,120\u00a0m',
  title: 'What if we took the next step together?',
  seeking: "I'm looking for a web developer role. Specify here the contract type, the work setup (remote, hybrid) and the location.",
  links: [
    { label: 'Email me', href: CONTACT_LINKS.email, isPrimary: true },
    { label: 'LinkedIn', href: CONTACT_LINKS.linkedin, isPrimary: false },
    { label: 'GitHub', href: CONTACT_LINKS.github, isPrimary: false },
    { label: 'Résumé (PDF)', href: CONTACT_LINKS.resume, isPrimary: false },
  ],
  footer: {
    signature: `© ${YEAR} Timothé`,
    madeWith: 'Designed and hand-coded with React, GSAP and plenty of elevation gain.',
  },
}

export const contactContent: Localized<typeof fr> = { fr, en }
