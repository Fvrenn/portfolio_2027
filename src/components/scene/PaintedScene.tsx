import { cn } from '@/lib/cn'
import { SceneImage } from './SceneImage'
import type { SceneLayer } from './scenes'

interface PaintedSceneProps {
  layers: SceneLayer[]
  imageClassName: string
  className?: string
}

export function PaintedScene({ layers, imageClassName, className }: PaintedSceneProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {layers.map(({ path, depth, scale = 1 }) => (
        <div key={path} data-scene-depth={depth} className="absolute inset-x-0 -inset-y-8 will-change-transform">
          <SceneImage path={path} style={{ scale }} className={cn('origin-bottom-right', imageClassName)} />
        </div>
      ))}
    </div>
  )
}
