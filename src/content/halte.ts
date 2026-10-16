import type { Localized } from '@/i18n/locale'

const fr = {
  eyebrow: 'La halte',
  backLabel: 'Revenir au sentier',
  sheet: {
    title: "Fiche d'observation",
    audienceLabel: 'Pour qui',
    roleLabel: 'Mon rôle',
    durationLabel: 'Durée',
    outcomeLabel: 'Résultat',
    demoLabel: 'Essayer la démo',
    codeLabel: 'Voir le code',
    liveLabel: 'Voir le site',
  },
  mist: { eyebrow: 'La brume', title: 'Le problème de départ' },
  binoculars: {
    eyebrow: 'Les jumelles',
    title: "Ce que j'ai construit",
    hint: 'Choisissez un repère, et promenez les jumelles pour repérer la faune cachée.',
    landmarks: { lake: 'Le lac', forest: 'La forêt', waterfall: 'La cascade', hamlet: 'Le hameau', glacier: 'Le glacier' },
    screenshotPlaceholder: 'Capture à venir',
  },
  gallery: {
    eyebrow: 'Les clichés',
    title: 'Le projet en images',
    shotLabel: 'Cliché',
    screenshotPlaceholder: 'Capture à venir',
  },
  notebook: {
    eyebrow: 'Le carnet de terrain',
    title: 'Mes décisions',
    choiceLabel: "J'ai choisi",
    alternativeLabel: 'plutôt que',
    reasonLabel: 'Pourquoi',
  },
  demo: {
    eyebrow: 'Essayer',
    title: 'La démo, sans quitter la page',
    intro: "Une copie du projet avec des données d'exemple : tout peut être testé, rien n'est enregistré.",
    openLabel: 'Prendre les jumelles',
    resetLabel: 'Réinitialiser',
    closeLabel: 'Fermer',
    unavailableLabel: 'Démo à venir',
    frameTitle: 'Démo interactive du projet',
  },
  readings: { eyebrow: 'Les relevés', title: 'Le résultat' },
  sunset: { eyebrow: 'Le soleil baisse', title: "Ce que j'ai appris" },
  departure: {
    eyebrow: 'On reprend la route',
    title: 'Le matériel utilisé',
    nextLabel: 'Prochaine étape',
  },
}

const en: typeof fr = {
  eyebrow: 'The rest stop',
  backLabel: 'Back to the trail',
  sheet: {
    title: 'Field sheet',
    audienceLabel: 'For whom',
    roleLabel: 'My role',
    durationLabel: 'Duration',
    outcomeLabel: 'Outcome',
    demoLabel: 'Try the demo',
    codeLabel: 'Browse the code',
    liveLabel: 'Visit the site',
  },
  mist: { eyebrow: 'The mist', title: 'The starting problem' },
  binoculars: {
    eyebrow: 'The binoculars',
    title: 'What I built',
    hint: 'Pick a landmark, and sweep the binoculars to spot the hidden wildlife.',
    landmarks: { lake: 'The lake', forest: 'The forest', waterfall: 'The waterfall', hamlet: 'The hamlet', glacier: 'The glacier' },
    screenshotPlaceholder: 'Screenshot coming soon',
  },
  gallery: {
    eyebrow: 'The snapshots',
    title: 'The project in pictures',
    shotLabel: 'Shot',
    screenshotPlaceholder: 'Screenshot coming soon',
  },
  notebook: {
    eyebrow: 'The field notebook',
    title: 'My decisions',
    choiceLabel: 'I chose',
    alternativeLabel: 'over',
    reasonLabel: 'Why',
  },
  demo: {
    eyebrow: 'Try it',
    title: 'The demo, right here',
    intro: 'A copy of the project with sample data: try anything, nothing is saved.',
    openLabel: 'Grab the binoculars',
    resetLabel: 'Reset',
    closeLabel: 'Close',
    unavailableLabel: 'Demo coming soon',
    frameTitle: 'Interactive project demo',
  },
  readings: { eyebrow: 'The readings', title: 'The outcome' },
  sunset: { eyebrow: 'The sun goes down', title: 'What I learned' },
  departure: {
    eyebrow: 'Back on the trail',
    title: 'The gear I used',
    nextLabel: 'Next stage',
  },
}

export type HalteLabels = typeof fr

export const halteContent: Localized<typeof fr> = { fr, en }
