const SCENE_IMAGE_DIR = '/images/parcours'

export const SCENE_WIDTHS = [768, 1536]
export const SCENE_FALLBACK_WIDTH = 1536

export interface SceneLayer {
  path: string
  depth: number
}

export const COL_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/col`, depth: 0 }]

export const REFUGE_SCENE: SceneLayer[] = [{ path: `${SCENE_IMAGE_DIR}/refuge`, depth: 0.5 }]

export const BIVOUAC_SCENE: SceneLayer[] = [
  { path: `${SCENE_IMAGE_DIR}/bivouac`, depth: 0.4 },
  { path: `${SCENE_IMAGE_DIR}/bivouac-camp`, depth: 1 },
]

export const SUMMIT_SCENE: SceneLayer[] = [
  { path: `${SCENE_IMAGE_DIR}/sommet`, depth: 0.4 },
  { path: `${SCENE_IMAGE_DIR}/sommet-perso`, depth: 1 },
]
