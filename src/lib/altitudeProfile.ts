import type { Point } from './svgPath'

export const PROFILE_VIEWBOX_WIDTH = 1000
export const PROFILE_VIEWBOX_HEIGHT = 240

const BASE_Y = 225
const SUMMIT_Y = 20

export function buildProfilePoints(count: number): Point[] {
  const climbPerStep = (BASE_Y - SUMMIT_Y) / (count + 1)
  return Array.from({ length: count }, (_, i) => [((i + 0.5) / count) * PROFILE_VIEWBOX_WIDTH, BASE_Y - (i + 1) * climbPerStep])
}

export function buildProfilePath(points: readonly Point[]): string {
  const route: Point[] = [[0, BASE_Y], ...points, [PROFILE_VIEWBOX_WIDTH, SUMMIT_Y]]
  const segments = route.slice(1).map((point, i) => toPlateauCurve(route[i], point))
  return [`M0 ${BASE_Y}`, ...segments].join('')
}

export const buildProfileArea = (path: string) => `${path}L${PROFILE_VIEWBOX_WIDTH} ${PROFILE_VIEWBOX_HEIGHT}L0 ${PROFILE_VIEWBOX_HEIGHT}Z`

function toPlateauCurve([fromX, fromY]: Point, [toX, toY]: Point): string {
  const midX = (fromX + toX) / 2
  return `C${midX} ${fromY} ${midX} ${toY} ${toX} ${toY}`
}
