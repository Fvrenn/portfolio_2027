import type { Point } from './svgPath'

export const TRAIL_VIEWBOX_WIDTH = 100
export const TRAIL_ROW_HEIGHT = 100

const CORNER_X = 3
const CORNER_Y = 6

export function buildTrailPoints(count: number, columnsX: readonly number[]): Point[] {
  return Array.from({ length: count }, (_, i) => [columnsX[i % columnsX.length], (i + 0.5) * TRAIL_ROW_HEIGHT])
}

export function buildTrailPath(points: readonly Point[]): string {
  const [firstX, firstY] = points[0]
  const [lastX, lastY] = points[points.length - 1]
  const halfRow = TRAIL_ROW_HEIGHT / 2
  const crossings = points.slice(1).map((point, i) => toRowCrossing(points[i], point))
  return [`M${firstX} 0`, `L${firstX} ${firstY}`, ...crossings, `L${lastX} ${lastY + halfRow}`].join('')
}

function toRowCrossing([fromX, fromY]: Point, [toX, toY]: Point): string {
  if (fromX === toX) return `L${toX} ${toY}`
  const crossingY = (fromY + toY) / 2
  const direction = Math.sign(toX - fromX)
  return [
    `L${fromX} ${crossingY - CORNER_Y}`,
    `Q${fromX} ${crossingY} ${fromX + direction * CORNER_X} ${crossingY}`,
    `L${toX - direction * CORNER_X} ${crossingY}`,
    `Q${toX} ${crossingY} ${toX} ${crossingY + CORNER_Y}`,
    `L${toX} ${toY}`,
  ].join('')
}

export const getTrailHeight = (count: number) => count * TRAIL_ROW_HEIGHT
