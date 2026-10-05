import type { Ref } from 'react'
import type { Point } from '@/lib/svgPath'
import { TRAIL_VIEWBOX_WIDTH } from '@/lib/trail'

interface TrailMarkersProps {
  points: Point[]
  height: number
  markerLabel: string
  walkerImage: string
  markerRef: Ref<HTMLDivElement>
}

const PERCENT = 100
const WALKER_WIDTH = 282
const WALKER_HEIGHT = 300

export function TrailMarkers({ points, height, markerLabel, walkerImage, markerRef }: TrailMarkersProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {points.map(([x, y], i) => (
        <span
          key={i}
          style={{ left: `${(x / TRAIL_VIEWBOX_WIDTH) * PERCENT}%`, top: `${(y / height) * PERCENT}%` }}
          className="absolute grid size-10 -translate-1/2 place-items-center rounded-full border-[3px] border-white bg-trail font-mono text-sm font-medium text-white shadow-object"
        >
          {i + 1}
        </span>
      ))}
      <div ref={markerRef} className="group absolute z-1 transition-opacity duration-300 data-idle:opacity-0 motion-reduce:hidden">
        <span className="absolute top-0 left-0 h-2 w-8 -translate-1/2 rounded-[50%] bg-ink/20 blur-[2px] sm:w-10" />
        <span className="relative block -translate-x-1/2 -translate-y-[92%]">
          <img
            src={walkerImage}
            alt=""
            width={WALKER_WIDTH}
            height={WALKER_HEIGHT}
            data-walker
            className="block h-[clamp(44px,4vw+30px,80px)] w-auto origin-bottom drop-shadow-md group-data-walking:animate-walk-bob data-[facing=left]:-scale-x-100"
          />
        </span>
        <span className="absolute -top-[clamp(40px,3vw+28px,56px)] left-10 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] tracking-[1px] whitespace-nowrap text-gps uppercase shadow-object max-sm:hidden">
          {markerLabel}
        </span>
      </div>
    </div>
  )
}
