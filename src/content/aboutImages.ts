const ABOUT_IMAGE_DIR = '/images/about'

export const ABOUT_IMAGES = {
  camp: `${ABOUT_IMAGE_DIR}/camp`,
  camper: `${ABOUT_IMAGE_DIR}/camp-perso.webp`,
  table: `${ABOUT_IMAGE_DIR}/table`,
  scarf: `${ABOUT_IMAGE_DIR}/foulard.webp`,
  mapBoard: `${ABOUT_IMAGE_DIR}/panneau.webp`,
}

export const PATCH_IMAGES = {
  tent: `${ABOUT_IMAGE_DIR}/ecusson-tente.webp`,
  compass: `${ABOUT_IMAGE_DIR}/ecusson-boussole.webp`,
  fire: `${ABOUT_IMAGE_DIR}/ecusson-feu.webp`,
  summit: `${ABOUT_IMAGE_DIR}/ecusson-sommet.webp`,
  code: `${ABOUT_IMAGE_DIR}/ecusson-code.webp`,
  bike: `${ABOUT_IMAGE_DIR}/ecusson-velo.webp`,
}

export type PatchId = keyof typeof PATCH_IMAGES
