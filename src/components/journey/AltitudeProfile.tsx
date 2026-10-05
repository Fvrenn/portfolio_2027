import { useRef } from 'react'
import { useProfileDraw } from '@/hooks/useProfileDraw'
import {
  buildProfileArea,
  buildProfilePath,
  buildProfilePoints,
  PROFILE_VIEWBOX_HEIGHT,
  PROFILE_VIEWBOX_WIDTH,
} from '@/lib/altitudeProfile'

const PERCENT = 100

export function AltitudeProfile({ stepCount }: { stepCount: number }) {
  const profileRef = useRef<HTMLDivElement>(null)
  useProfileDraw(profileRef)

  const points = buildProfilePoints(stepCount)
  const path = buildProfilePath(points)

  return (
    <div ref={profileRef} className="relative h-[140px] sm:h-[200px]" aria-hidden="true">
      <svg
        viewBox={`0 0 ${PROFILE_VIEWBOX_WIDTH} ${PROFILE_VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        <path d={buildProfileArea(path)} className="fill-map-forest/60" />
        <path
          d={path}
          data-profile-line
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1 2"
          strokeDashoffset="0"
          className="stroke-trail"
        />
      </svg>
      {points.map(([x, y], i) => (
        <span
          key={i}
          data-profile-stop
          style={{ left: `${(x / PROFILE_VIEWBOX_WIDTH) * PERCENT}%`, top: `${(y / PROFILE_VIEWBOX_HEIGHT) * PERCENT}%` }}
          className="absolute grid size-9 -translate-1/2 place-items-center rounded-full border-[3px] border-white bg-trail font-mono text-sm font-medium text-white shadow-object"
        >
          {i + 1}
        </span>
      ))}
    </div>
  )
}
