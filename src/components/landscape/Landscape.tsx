import { LANDSCAPE_LAYERS } from './layers'
import { ParallaxLayer } from './ParallaxLayer'

export function Landscape() {
  return (
    <div aria-hidden="true">
      {LANDSCAPE_LAYERS.map(({ path, depth }) => (
        <ParallaxLayer key={path} path={path} depth={depth} />
      ))}
    </div>
  )
}
