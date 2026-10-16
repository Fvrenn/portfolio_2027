import type { Point } from '@/lib/svgPath'

export const CAMPER_SIZE = { width: 470, height: 900 }
export const CAMPER_SPOT = { leftPercent: 44, bottomPercent: 4, widthPercent: 16.7 }

export const ROPE = { endY: 8, sagY: 38 }

export const MAP_BOARD_SIZE = { width: 1400, height: 978 }
export const MAP_PINS: Point[] = [
  [392, 606],
  [588, 489],
  [905, 425],
  [700, 238],
]
export const MAP_STRING_SAG = 38

export const SCARF_SIZE = { width: 1200, height: 523 }
export const PATCH_SPOTS = [
  { xPercent: 21, yPercent: 22 },
  { xPercent: 40, yPercent: 22 },
  { xPercent: 60, yPercent: 22 },
  { xPercent: 79, yPercent: 22 },
  { xPercent: 40, yPercent: 56 },
  { xPercent: 60, yPercent: 56 },
]
export const PATCH_WIDTH_PERCENT = 11

export const TABLE_CARD_TILTS = [-6, 8, -9, 5, -4]
