export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount

export const angleDelta = (fromDeg: number, toDeg: number) =>
  ((((toDeg - fromDeg) % 360) + 540) % 360) - 180

export const normalizeDeg = (deg: number) => ((deg % 360) + 360) % 360

export const getBearingDeg = (dx: number, dy: number) => (Math.atan2(dx, -dy) * 180) / Math.PI

export function toCardinal(deg: number, points: readonly string[]): string {
  const degPerPoint = 360 / points.length
  return points[Math.round(normalizeDeg(deg) / degPerPoint) % points.length]
}

export function getClosestBearingIndex(bearingsDeg: readonly number[], headingDeg: number): number {
  const distances = bearingsDeg.map((bearingDeg) => Math.abs(angleDelta(headingDeg, bearingDeg)))
  return distances.indexOf(Math.min(...distances))
}
