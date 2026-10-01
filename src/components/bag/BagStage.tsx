import type { BagItem } from '@/content/bag'
import {
  BAG_IMAGE_HEIGHT,
  BAG_IMAGE_WIDTH,
  FRONT_LAYER_CLIP,
  ITEM_WIDTH_PERCENT,
  OPENING_CENTER,
} from './bagGeometry'

interface BagStageProps {
  items: BagItem[]
  openImage: string
  closedImage: string
  imageAlt: string
}

const layerClassName = 'absolute inset-0 size-full'

export function BagStage({ items, openImage, closedImage, imageAlt }: BagStageProps) {
  return (
    <div data-bag-stage className="relative aspect-[679/918] h-full max-h-full">
      <div data-bag-body className="absolute inset-0 origin-bottom">
        <img src={openImage} alt="" aria-hidden="true" width={BAG_IMAGE_WIDTH} height={BAG_IMAGE_HEIGHT} data-bag-open className={`${layerClassName} opacity-0`} />
        {items.map(({ id, image }) => (
          <img
            key={id}
            src={image}
            alt=""
            aria-hidden="true"
            data-bag-item
            style={{ left: `${OPENING_CENTER.xPercent}%`, top: `${OPENING_CENTER.yPercent}%`, width: `${ITEM_WIDTH_PERCENT}%` }}
            className="absolute h-auto -translate-1/2 opacity-0 drop-shadow-lg"
          />
        ))}
        <img
          src={openImage}
          alt=""
          aria-hidden="true"
          data-bag-open
          style={{ clipPath: FRONT_LAYER_CLIP }}
          className={`${layerClassName} opacity-0`}
        />
        <img src={closedImage} alt={imageAlt} width={BAG_IMAGE_WIDTH} height={BAG_IMAGE_HEIGHT} data-bag-closed className={layerClassName} />
      </div>
      <span className="absolute inset-x-[12%] -bottom-2 h-6 rounded-[50%] bg-ink/15 blur-md" aria-hidden="true" />
    </div>
  )
}
