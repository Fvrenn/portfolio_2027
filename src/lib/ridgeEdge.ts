import { toPolygonPath, type Point } from './svgPath'

export const RIDGE_VIEWBOX_WIDTH = 1000
export const RIDGE_VIEWBOX_HEIGHT = 100

export interface RidgeWindow {
  startRatio: number
  spanRatio: number
  isMirrored: boolean
}

interface RidgeEdgeOptions extends RidgeWindow {
  peakY: number
  valleyY: number
}

export function buildRidgeEdgePath(profile: readonly number[], options: RidgeEdgeOptions): string {
  const { startRatio, spanRatio, isMirrored, peakY, valleyY } = options
  const lastIndex = profile.length - 1
  const ridge = profile.map((_, i): Point => {
    const sourceIndex = Math.min(lastIndex, Math.round((startRatio + (i / lastIndex) * spanRatio) * lastIndex))
    const value = profile[isMirrored ? lastIndex - sourceIndex : sourceIndex]
    return [(i / lastIndex) * RIDGE_VIEWBOX_WIDTH, peakY + value * (valleyY - peakY)]
  })
  return toPolygonPath([[0, RIDGE_VIEWBOX_HEIGHT], ...ridge, [RIDGE_VIEWBOX_WIDTH, RIDGE_VIEWBOX_HEIGHT]])
}
