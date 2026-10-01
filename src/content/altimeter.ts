import type { Localized } from '@/i18n/locale'

const fr = { label: 'Alt.' }
const en: typeof fr = { label: 'Alt.' }

export const altimeterContent: Localized<typeof fr> = { fr, en }

export const ALTITUDE_RANGE = { baseAltitudeM: 1050, summitAltitudeM: 3120 }
