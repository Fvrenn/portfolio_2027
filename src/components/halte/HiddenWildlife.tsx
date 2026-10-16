import { HALTE_WILDLIFE } from '@/components/scene/scenes'
import { CHAMOIS_SIZE, EAGLE_SIZE, MARMOT_SIZE, WILDLIFE_SPOTS } from './landmarks'

const ANIMALS = [
  { key: 'chamois', src: HALTE_WILDLIFE.chamois, size: CHAMOIS_SIZE, spot: WILDLIFE_SPOTS.chamois },
  { key: 'marmot', src: HALTE_WILDLIFE.marmot, size: MARMOT_SIZE, spot: WILDLIFE_SPOTS.marmot },
]

const { eagle } = WILDLIFE_SPOTS

export function HiddenWildlife() {
  return (
    <>
      {ANIMALS.map(({ key, src, size, spot }) => (
        <img
          key={key}
          src={src}
          alt=""
          width={size.width}
          height={size.height}
          loading="lazy"
          decoding="async"
          style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%`, width: `${spot.widthPercent}%` }}
          className="absolute h-auto -translate-x-1/2 -translate-y-full drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.45)]"
        />
      ))}
      <div
        style={{ left: `${eagle.xPercent}%`, top: `${eagle.yPercent}%`, width: `${eagle.widthPercent}%` }}
        className="absolute -translate-1/2"
      >
        <img
          src={HALTE_WILDLIFE.eagle}
          alt=""
          width={EAGLE_SIZE.width}
          height={EAGLE_SIZE.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full motion-safe:animate-eagle-soar"
        />
      </div>
    </>
  )
}
