export const BAG_IMAGE_WIDTH = 679
export const BAG_IMAGE_HEIGHT = 918

export const OPENING_CENTER = { xPercent: 56.5, yPercent: 13.8 }
export const ITEM_WIDTH_PERCENT = 40

const OPENING_FRONT_RIM: [number, number][] = [
  [34, 13.4],
  [38.1, 15.9],
  [44, 17.3],
  [51.4, 18.1],
  [57.3, 18.4],
  [63.2, 18.7],
  [69.1, 18.4],
  [75, 17.9],
  [78.9, 17],
]

const toPolygon = (points: [number, number][]) => `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`

export const FRONT_LAYER_CLIP = toPolygon([
  [0, OPENING_FRONT_RIM[0][1]],
  ...OPENING_FRONT_RIM,
  [100, OPENING_FRONT_RIM[OPENING_FRONT_RIM.length - 1][1]],
  [100, 100],
  [0, 100],
])
