import { buildContourPaths } from '@/lib/topography'

const MAP_WIDTH = 1440
const MAP_HEIGHT = 960
const INDEX_CONTOUR_INTERVAL = 4

const contourPaths = buildContourPaths({ width: MAP_WIDTH, height: MAP_HEIGHT, cellSize: 8, levelCount: 12, seed: 4 })

export function TopoLines() {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full mask-t-from-[calc(100%-320px)] mask-b-from-[calc(100%-240px)]"
      aria-hidden="true"
    >
      {contourPaths.map((path, level) => (
        <path
          key={level}
          d={path}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth={isIndexContour(level) ? 1.3 : 0.8}
          className={isIndexContour(level) ? 'stroke-topo/25' : 'stroke-topo/12'}
        />
      ))}
    </svg>
  )
}

const isIndexContour = (level: number) => level % INDEX_CONTOUR_INTERVAL === 0
