import type { CSSProperties } from 'react'
import { PAINTING_HEIGHT, PAINTING_WIDTH } from '@/components/landscape/layers'
import { cn } from '@/lib/cn'
import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'
import { SCENE_FALLBACK_WIDTH, SCENE_WIDTHS } from './scenes'

interface SceneImageProps {
  path: string
  className?: string
  style?: CSSProperties
}

export function SceneImage({ path, className, style }: SceneImageProps) {
  return (
    <img
      src={toSizedSrc(path, SCENE_FALLBACK_WIDTH)}
      srcSet={toSrcSet(path, SCENE_WIDTHS)}
      sizes="100vw"
      alt=""
      width={PAINTING_WIDTH}
      height={PAINTING_HEIGHT}
      loading="lazy"
      decoding="async"
      style={style}
      className={cn('size-full object-cover', className)}
    />
  )
}
