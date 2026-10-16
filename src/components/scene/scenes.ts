const SCENE_IMAGE_DIR = '/images/parcours'

export const SCENE_WIDTHS = [768, 1536]
export const SCENE_FALLBACK_WIDTH = 1536

export interface SceneLayer {
  path: string
  depth: number
  scale?: number
}

export const COL_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/col`, depth: 0 }]

export const REFUGE_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/refuge`, depth: 0.5 }]

export const BIVOUAC_SCENE: SceneLayer[] = [
  { path: `${SCENE_IMAGE_DIR}/bivouac`, depth: 0.4 },
  { path: `${SCENE_IMAGE_DIR}/bivouac-camp`, depth: 1 },
]

export const SUMMIT_SKY_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/sommet`, depth: 0.4 }]

export const SUMMIT_HIKER_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/sommet-perso`, depth: 1, scale: 0.9 }]

const HALTE_IMAGE_DIR = '/images/halte'

export const HALTE_PANORAMA_PATH = `${HALTE_IMAGE_DIR}/halte-fond`

export const HALTE_PERSO_PATH = `${HALTE_IMAGE_DIR}/halte-perso`
export const HALTE_PERSO_STANDING_PATH = `${HALTE_IMAGE_DIR}/halte-perso-debout`

export const HALTE_SCENE: SceneLayer[] = [
  { path: HALTE_PANORAMA_PATH, depth: 0.4 },
  { path: HALTE_PERSO_PATH, depth: 1 },
]

export const HALTE_WILDLIFE = {
  eagle: `${HALTE_IMAGE_DIR}/aigle.webp`,
  marmot: `${HALTE_IMAGE_DIR}/marmotte.webp`,
  chamois: `${HALTE_IMAGE_DIR}/chamois.webp`,
}

export const HALTE_MIST_BANDS = [1, 2, 3, 4].map((n) => `${HALTE_IMAGE_DIR}/brume-${n}.webp`)

export const HALTE_NOTEBOOK_PATH = `${HALTE_IMAGE_DIR}/carnet`
