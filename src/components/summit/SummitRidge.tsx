import { LAYER_FALLBACK_WIDTH, LAYER_WIDTHS, MOUNTAINS_PATH } from '@/components/landscape/layers'
import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'

const ridgeImage = toSizedSrc(MOUNTAINS_PATH, LAYER_FALLBACK_WIDTH)
const ridgeBox = 'absolute inset-x-0 bottom-0 h-[160%] w-full'

export function SummitRidge() {
  return (
    <div className="pointer-events-none relative isolate -mx-6 mt-16 h-[clamp(220px,32vw,420px)]" aria-hidden="true">
      <img
        src={ridgeImage}
        srcSet={toSrcSet(MOUNTAINS_PATH, LAYER_WIDTHS)}
        sizes="100vw"
        alt=""
        decoding="async"
        loading="lazy"
        className={`${ridgeBox} object-cover object-bottom grayscale`}
      />
      <div
        style={{ maskImage: `url(${ridgeImage})`, WebkitMaskImage: `url(${ridgeImage})` }}
        className={`${ridgeBox} bg-linear-to-b from-dusk-low via-dusk-mid to-dusk-ridge mix-blend-multiply [mask-position:bottom] [mask-size:cover] [mask-repeat:no-repeat]`}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-dusk-ridge" />
    </div>
  )
}
