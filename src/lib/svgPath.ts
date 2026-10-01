export type Point = readonly [x: number, y: number]

const round = (value: number) => Math.round(value * 10) / 10

const toPolylinePath = (points: readonly Point[]) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`).join('')

export const toPolygonPath = (points: readonly Point[]) => `${toPolylinePath(points)}Z`
