import type { Ref } from 'react'
import type { Point } from '@/lib/svgPath'
import { TRAIL_VIEWBOX_WIDTH } from '@/lib/trail'

interface TrailMarkersProps {
  points: Point[]
  height: number
  markerLabel: string
  markerRef: Ref<HTMLDivElement>
}

const PERCENT = 100

export function TrailMarkers({ points, height, markerLabel, markerRef }: TrailMarkersProps) {
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
      <div ref={markerRef} className="absolute z-1 -translate-1/2 motion-reduce:hidden">
        <span className="absolute inset-0 -m-3 rounded-full bg-gps/20" />
        <span className="relative block size-4 rounded-full border-[3px] border-white bg-gps shadow-object" />
        <span className="absolute top-1/2 left-7 -translate-y-1/2 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] tracking-[1px] whitespace-nowrap text-gps uppercase shadow-object max-sm:hidden">
          {markerLabel}
        </span>
      </div>
    </div>
  )
}
