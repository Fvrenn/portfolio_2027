import { cn } from '@/lib/cn'
import { toPolygonPath, type Point } from '@/lib/svgPath'

const TICK_STEP_DEG = 5
const TICK_OUTER_RADIUS = 94
const LABEL_RADIUS = 70
const RING_RADIUS = 56
const MAIN_POINT_RADIUS = 52
const MINOR_POINT_RADIUS = 30
const POINT_HALF_WIDTH = 8

const TICKS_DEG = Array.from({ length: 360 / TICK_STEP_DEG }, (_, i) => i * TICK_STEP_DEG)
const MAIN_POINTS_DEG = [0, 90, 180, 270]
const MINOR_POINTS_DEG = [45, 135, 225, 315]


interface CompassRoseProps {
  activeBearingDeg: number
  cardinalPoints: string[]
}

const MAIN_POINT_STEP = 2

export function CompassRose({ activeBearingDeg, cardinalPoints }: CompassRoseProps) {
  const mainLabels = cardinalPoints
    .filter((_, i) => i % MAIN_POINT_STEP === 0)
    .map((text, i, labels) => ({ text, deg: (360 / labels.length) * i }))

  return (
    <svg viewBox="-100 -100 200 200" className="absolute inset-0 size-full" aria-hidden="true">
      {TICKS_DEG.map((deg) => (
        <Tick key={deg} deg={deg} />
      ))}
      <circle r={RING_RADIUS} fill="none" className="stroke-brass-deep/30" strokeWidth={1} />
      {MINOR_POINTS_DEG.map((deg) => (
        <StarPoint key={deg} deg={deg} radius={MINOR_POINT_RADIUS} />
      ))}
      {MAIN_POINTS_DEG.map((deg) => (
        <StarPoint key={deg} deg={deg} radius={MAIN_POINT_RADIUS} />
      ))}
      {mainLabels.map(({ text, deg }) => (
        <text
          key={text}
          transform={`rotate(${deg}) translate(0 ${-LABEL_RADIUS}) rotate(${-deg})`}
          textAnchor="middle"
          dominantBaseline="central"
          className={cn('font-serif text-[19px] transition-colors duration-300', deg === activeBearingDeg ? 'fill-alert' : 'fill-brass-deep')}
        >
          {text}
        </text>
      ))}
    </svg>
  )
}

function StarPoint({ deg, radius }: { deg: number; radius: number }) {
  const shadedHalf: Point[] = [[0, -radius], [POINT_HALF_WIDTH, 0], [0, 0]]
  const litHalf: Point[] = [[0, -radius], [-POINT_HALF_WIDTH, 0], [0, 0]]
  return (
    <g transform={`rotate(${deg})`}>
      <path d={toPolygonPath(shadedHalf)} className="fill-brass-deep/80" />
      <path d={toPolygonPath(litHalf)} className="fill-paper-shade stroke-brass-deep/60" strokeWidth={0.6} />
    </g>
  )
}

function Tick({ deg }: { deg: number }) {
  const { length, width, className } = getTickStyle(deg)
  return (
    <line
      y1={-TICK_OUTER_RADIUS}
      y2={-TICK_OUTER_RADIUS + length}
      transform={`rotate(${deg})`}
      strokeWidth={width}
      className={className}
    />
  )
}

function getTickStyle(deg: number) {
  if (deg % 90 === 0) return { length: 11, width: 2, className: 'stroke-brass-deep' }
  if (deg % 45 === 0) return { length: 8, width: 1.4, className: 'stroke-brass-deep' }
  return { length: 5, width: 0.8, className: 'stroke-brass-deep/60' }
}
