import { PaintedLayer } from './PaintedLayer'

interface ParallaxLayerProps {
  path: string
  depth: number
}

export function ParallaxLayer({ path, depth }: ParallaxLayerProps) {
  return (
    <div data-parallax-depth={depth} className="pointer-events-none absolute inset-y-0 -inset-x-10 will-change-transform">
      <PaintedLayer path={path} />
    </div>
  )
}
