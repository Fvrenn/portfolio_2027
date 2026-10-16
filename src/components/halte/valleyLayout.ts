import { HALTE_MIST_BANDS } from '@/components/scene/scenes'

export interface FogBand {
  src: string
  topPercent: number
  leftPercent: number
  widthPercent: number
  opacity: number
  isFlipped: boolean
  driftDirection: 1 | -1
}

export const FOG_BANDS: FogBand[] = [
  { src: HALTE_MIST_BANDS[0], topPercent: 30, leftPercent: -8, widthPercent: 70, opacity: 0.75, isFlipped: false, driftDirection: -1 },
  { src: HALTE_MIST_BANDS[1], topPercent: 36, leftPercent: 38, widthPercent: 72, opacity: 0.8, isFlipped: true, driftDirection: 1 },
  { src: HALTE_MIST_BANDS[2], topPercent: 46, leftPercent: 4, widthPercent: 64, opacity: 0.9, isFlipped: false, driftDirection: -1 },
  { src: HALTE_MIST_BANDS[3], topPercent: 50, leftPercent: 48, widthPercent: 60, opacity: 0.85, isFlipped: true, driftDirection: 1 },
  { src: HALTE_MIST_BANDS[1], topPercent: 60, leftPercent: -12, widthPercent: 76, opacity: 0.9, isFlipped: false, driftDirection: -1 },
  { src: HALTE_MIST_BANDS[0], topPercent: 64, leftPercent: 40, widthPercent: 74, opacity: 0.85, isFlipped: true, driftDirection: 1 },
]

export const VALLEY_PHASES = {
  sheetOut: 0.3,
  fogIn: 0.4,
  problemIn: 1,
  fogOut: 2,
  binocularsIn: 2.6,
  featuresStart: 3.1,
}

export const FEATURE_STEP = 0.8
export const SCROLL_VH_PER_PHASE = 70

export const getValleyDuration = (featureCount: number) => VALLEY_PHASES.featuresStart + featureCount * FEATURE_STEP
