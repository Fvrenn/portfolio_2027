export const PAINTING_WIDTH = 1536
export const PAINTING_HEIGHT = 1024

const HERO_IMAGE_DIR = '/images/hero'

export const LAYER_WIDTHS = [1280, 1920, 2560, 3840]
export const LAYER_FALLBACK_WIDTH = 1920
export const LAYER_SIZES = '(min-aspect-ratio: 3/2) calc(100vw + 80px), 100vh'

export const CLOUD_WIDTHS = [480, 960, 1600]
export const CLOUD_FALLBACK_WIDTH = 960

export const SKY_PATH = `${HERO_IMAGE_DIR}/sky`

export const MOUNTAINS_PATH = `${HERO_IMAGE_DIR}/mountains`

export const LANDSCAPE_LAYERS = [
  { path: MOUNTAINS_PATH, depth: 0.15 },
  { path: `${HERO_IMAGE_DIR}/lake`, depth: 0.3 },
  { path: `${HERO_IMAGE_DIR}/forest`, depth: 0.55 },
  { path: `${HERO_IMAGE_DIR}/foreground`, depth: 1 },
]

export const CLOUDS = [
  { path: `${HERO_IMAGE_DIR}/cloud-3`, widthVw: 17, className: '-top-[2vh] -left-[5vw] opacity-90 motion-safe:animate-cloud-drift' },
  { path: `${HERO_IMAGE_DIR}/cloud-2`, widthVw: 11, className: 'top-[5vh] left-[38vw] opacity-80 motion-safe:animate-cloud-drift-slow' },
  { path: `${HERO_IMAGE_DIR}/cloud-1`, widthVw: 24, className: 'top-[38vh] -right-[3vw] opacity-80 motion-safe:animate-cloud-drift' },
]
