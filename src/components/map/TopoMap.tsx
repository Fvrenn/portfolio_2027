import { buildTopographicMap } from '@/lib/topography'

const MAP_WIDTH = 1440
const MAP_HEIGHT = 1800
const GRID_STEP = 180
const INDEX_CONTOUR_INTERVAL = 4

const terrain = buildTopographicMap({
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  cellSize: 8,
  seed: 21,
  levelCount: 18,
  waterLevel: -0.32,
  forestSeed: 77,
  forestLevel: 0.08,
})

const gridLinesX = Array.from({ length: Math.floor(MAP_WIDTH / GRID_STEP) }, (_, i) => (i + 1) * GRID_STEP)
const gridLinesY = Array.from({ length: Math.floor(MAP_HEIGHT / GRID_STEP) }, (_, i) => (i + 1) * GRID_STEP)

export function TopoMap() {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full mask-t-from-[calc(100%-360px)] mask-b-from-[calc(100%-200px)]"
      aria-hidden="true"
    >
      <path d={terrain.forest} className="fill-map-forest" />
      <g className="stroke-map-grid" strokeWidth={1} vectorEffect="non-scaling-stroke">
        {gridLinesX.map((x) => (
          <line key={`x${x}`} x1={x} x2={x} y2={MAP_HEIGHT} />
        ))}
        {gridLinesY.map((y) => (
          <line key={`y${y}`} y1={y} y2={y} x2={MAP_WIDTH} />
        ))}
      </g>
      {terrain.contours.map((path, level) => (
        <path
          key={level}
          d={path}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth={isIndexContour(level) ? 1.2 : 0.7}
          className={isIndexContour(level) ? 'stroke-topo-index/55' : 'stroke-topo/35'}
        />
      ))}
      <path d={terrain.water} strokeWidth={1.2} vectorEffect="non-scaling-stroke" className="fill-map-water stroke-map-water-edge" />
    </svg>
  )
}

const isIndexContour = (level: number) => level % INDEX_CONTOUR_INTERVAL === 0
