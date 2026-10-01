import { useId, type Ref } from 'react'
import { TRAIL_VIEWBOX_WIDTH } from '@/lib/trail'

interface TrailPathProps {
  path: string
  height: number
  pathRef: Ref<SVGPathElement>
  revealPathRef: Ref<SVGPathElement>
}

const routeProps = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const

export function TrailPath({ path, height, pathRef, revealPathRef }: TrailPathProps) {
  const maskId = `${useId()}-trail`

  return (
    <svg
      viewBox={`0 0 ${TRAIL_VIEWBOX_WIDTH} ${height}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <path
            ref={revealPathRef}
            d={path}
            {...routeProps}
            stroke="white"
            strokeWidth={24}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </mask>
      </defs>
      <path ref={pathRef} d={path} {...routeProps} strokeWidth={9} className="stroke-white/80" />
      <path d={path} {...routeProps} strokeWidth={3} strokeDasharray="6 7" className="stroke-trail/30" />
      <g mask={`url(#${maskId})`}>
        <path d={path} {...routeProps} strokeWidth={9} className="stroke-white" />
        <path d={path} {...routeProps} strokeWidth={4} strokeDasharray="6 7" className="stroke-trail" />
      </g>
    </svg>
  )
}
