import type { Localized } from '@/i18n/locale'

const fr = { label: 'Alt.' }
const en: typeof fr = { label: 'Alt.' }

export const altimeterContent: Localized<typeof fr> = { fr, en }

export interface AltitudeRange {
  baseAltitudeM: number
  summitAltitudeM: number
}

export const ALTITUDE_RANGE: AltitudeRange = { baseAltitudeM: 1050, summitAltitudeM: 3120 }

export const BASE_CAMP_ALTITUDE_RANGE: AltitudeRange = { baseAltitudeM: 980, summitAltitudeM: 1050 }

const BELVEDERE_CLIMB_M = 120

export const toHalteAltitudeRange = (projectAltitudeM: number): AltitudeRange => ({
  baseAltitudeM: projectAltitudeM,
  summitAltitudeM: projectAltitudeM + BELVEDERE_CLIMB_M,
})
