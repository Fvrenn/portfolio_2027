import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'
import { LAYER_FALLBACK_WIDTH, LAYER_SIZES, LAYER_WIDTHS, PAINTING_HEIGHT, PAINTING_WIDTH } from './layers'

export function PaintedLayer({ path }: { path: string }) {
  return (
    <img
      src={toSizedSrc(path, LAYER_FALLBACK_WIDTH)}
      srcSet={toSrcSet(path, LAYER_WIDTHS)}
      sizes={LAYER_SIZES}
      alt=""
      width={PAINTING_WIDTH}
      height={PAINTING_HEIGHT}
      decoding="async"
      className="size-full object-cover object-[20%_30%]"
    />
  )
}
