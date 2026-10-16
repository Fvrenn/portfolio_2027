import type { LandmarkId } from '@/content/projectDetails'

interface MapSpot {
  xPercent: number
  yPercent: number
}

interface WildlifeSpot extends MapSpot {
  widthPercent: number
}

export const LANDMARK_POSITIONS: Record<LandmarkId, MapSpot> = {
  lake: { xPercent: 15, yPercent: 57 },
  forest: { xPercent: 32, yPercent: 68 },
  waterfall: { xPercent: 49, yPercent: 54 },
  hamlet: { xPercent: 76, yPercent: 56 },
  glacier: { xPercent: 86, yPercent: 24 },
}

export const WILDLIFE_SPOTS = {
  chamois: { xPercent: 41.5, yPercent: 49.5, widthPercent: 1.5 },
  marmot: { xPercent: 79.4, yPercent: 68.6, widthPercent: 1.25 },
  eagle: { xPercent: 30, yPercent: 15, widthPercent: 2.6 },
} satisfies Record<string, WildlifeSpot>

export const MARMOT_SIZE = { width: 351, height: 600 }
export const CHAMOIS_SIZE = { width: 430, height: 600 }
export const EAGLE_SIZE = { width: 600, height: 571 }
export const NOTEBOOK_SIZE = { width: 1536, height: 872 }
