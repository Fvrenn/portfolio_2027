import { PAINTING_HEIGHT, PAINTING_WIDTH } from '@/components/landscape/layers'
import { cn } from '@/lib/cn'
import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'
import { SCENE_FALLBACK_WIDTH, SCENE_WIDTHS, type SceneLayer } from './scenes'

interface PaintedSceneProps {
  layers: SceneLayer[]
  imageClassName: string
  className?: string
}

export function PaintedScene({ layers, imageClassName, className }: PaintedSceneProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {layers.map(({ path, depth }) => (
        <div key={path} data-scene-depth={depth} className="absolute inset-x-0 -inset-y-8 will-change-transform">
          <img
            src={toSizedSrc(path, SCENE_FALLBACK_WIDTH)}
            srcSet={toSrcSet(path, SCENE_WIDTHS)}
            sizes="100vw"
            alt=""
            width={PAINTING_WIDTH}
            height={PAINTING_HEIGHT}
            loading="lazy"
            decoding="async"
            className={cn('size-full object-cover', imageClassName)}
          />
        </div>
      ))}
    </div>
  )
}
