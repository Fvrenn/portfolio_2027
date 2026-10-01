const IMAGE_EXTENSION = 'webp'

export const toSizedSrc = (basePath: string, width: number) => `${basePath}-${width}.${IMAGE_EXTENSION}`

export const toSrcSet = (basePath: string, widths: readonly number[]) =>
  widths.map((width) => `${toSizedSrc(basePath, width)} ${width}w`).join(', ')
