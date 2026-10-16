import type { Point } from './svgPath'

export const getQuadraticY = (startY: number, controlY: number, endY: number, t: number) =>
  (1 - t) ** 2 * startY + 2 * (1 - t) * t * controlY + t ** 2 * endY

export function buildSaggingSegment([fromX, fromY]: Point, [toX, toY]: Point, sag: number): string {
  return `M${fromX} ${fromY}Q${(fromX + toX) / 2} ${(fromY + toY) / 2 + sag} ${toX} ${toY}`
}
