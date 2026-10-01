import { useRef, type ReactNode, type Ref } from 'react'
import { useCompassNeedle } from '@/hooks/useCompassNeedle'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'
import { getClosestBearingIndex } from '@/lib/math'
import { CompassRose } from './CompassRose'
import { Needle } from './Needle'
import { CompassTag, type Waypoint } from './CompassTag'

interface CompassProps {
  headingLabel: string
  waypoints: Waypoint[]
  cardinalPoints: string[]
  className?: string
}

export function Compass({ headingLabel, waypoints, cardinalPoints, className }: CompassProps) {
  const dialRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const headingDeg = useCompassNeedle({ dialRef, needleRef }, usePrefersReducedMotion())

  const waypoint = waypoints[getClosestBearingIndex(waypoints.map(({ bearingDeg }) => bearingDeg), headingDeg)]

  return (
    <div className={cn('relative flex items-start', className)}>
      <BrassCase>
        <Dial ref={dialRef}>
          <CompassRose activeBearingDeg={waypoint.bearingDeg} cardinalPoints={cardinalPoints} />
          <Needle ref={needleRef} />
          <GlassHighlight />
        </Dial>
      </BrassCase>
      <CompassTag waypoint={waypoint} headingLabel={headingLabel} headingDeg={headingDeg}
        cardinalPoints={cardinalPoints}
        className="-ml-4 mt-14" />
    </div>
  )
}

function BrassCase({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-1 size-[140px] shrink-0">
      <BailRing />
      <div className="bg-brass-knurl absolute inset-0 rounded-full shadow-object" />
      <div className="bg-brass absolute inset-[4px] rounded-full shadow-[inset_0_2px_3px_var(--color-brass-highlight),inset_0_-3px_4px_var(--color-brass-deep)]" />
      <div className="absolute inset-[13px]">{children}</div>
    </div>
  )
}

function BailRing() {
  return (
    <div className="absolute -top-[24px] left-1/2 flex -translate-x-1/2 flex-col items-center">
      <span className="size-[28px] rounded-full border-[5px] border-brass shadow-[inset_0_1px_1px_var(--color-brass-deep),0_2px_3px_rgb(0_0_0/0.3)]" />
      <span className="bg-brass -mt-1 h-[10px] w-[12px] rounded-sm" />
    </div>
  )
}

function Dial({ ref, children }: { ref: Ref<HTMLDivElement>; children: ReactNode }) {
  return (
    <div ref={ref} className="bg-paper shadow-groove relative size-full rounded-full border border-brass-deep">
      {children}
    </div>
  )
}

function GlassHighlight() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-150 from-white/50 via-transparent via-40% to-transparent" />
  )
}
