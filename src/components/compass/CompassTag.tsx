import { toHeadingLabel } from '@/lib/format'
import { toCardinal } from '@/lib/math'
import { cn } from '@/lib/cn'

export interface Waypoint {
  bearingDeg: number
  label: string
  title: string
  detail: string
  href: string
}

interface CompassTagProps {
  waypoint: Waypoint
  headingLabel: string
  headingDeg: number
  cardinalPoints: string[]
  className?: string
}

const TAG_SHAPE = '[clip-path:polygon(14px_0,100%_0,100%_100%,14px_100%,0_calc(100%-14px),0_14px)]'

export function CompassTag({ waypoint, headingLabel, headingDeg, cardinalPoints, className }: CompassTagProps) {
  return (
    <a href={waypoint.href} className={cn('group block origin-[0%_50%] drop-shadow-md motion-safe:animate-tag-sway hover:[animation-play-state:paused]', className)}>
      <div className={cn('bg-paper relative w-[178px] py-3 pr-3 pl-7 text-ink transition-transform duration-300 ease-spring group-hover:translate-x-1', TAG_SHAPE)}>
        <span className="absolute top-1/2 left-2.5 size-2.5 -translate-y-1/2 rounded-full bg-brass-dark shadow-[inset_0_1px_1px_rgb(0_0_0/0.5)]" />
        <div key={waypoint.bearingDeg} className="motion-safe:animate-tag-swap">
          <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-[1.4px] text-ink/70 uppercase">
            <MountainIcon />
            {waypoint.label}
          </p>
          <p className="mt-1 font-hand text-[22px] leading-none font-bold">{waypoint.title}</p>
          <p className="mt-1 font-mono text-[10px] text-ink/80">{waypoint.detail}</p>
        </div>
        <p className="mt-2 border-t border-dashed border-brass-dark/50 pt-1.5 font-mono text-[10px] tracking-[1px] uppercase">
          {headingLabel} · {toCardinal(headingDeg, cardinalPoints)} {toHeadingLabel(headingDeg)}
        </p>
        <span aria-hidden="true" className="absolute top-2.5 right-3 text-sm text-trail-dark transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  )
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 16 10" className="h-2.5 w-4 fill-none stroke-ink/70" strokeWidth={1.4} strokeLinejoin="round" aria-hidden="true">
      <path d="M1 9 6 2l3 4 2-2 4 5Z" />
    </svg>
  )
}
