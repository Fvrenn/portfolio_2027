import { useRef } from 'react'
import { ALTITUDE_RANGE, altimeterContent } from '@/content/altimeter'
import { useLocale } from '@/hooks/useLocale'
import { useAltimeter } from '@/hooks/useAltimeter'
import { toAltitudeLabel } from '@/lib/format'

const TICK_COUNT = 11

export function Altimeter() {
  const markerRef = useRef<HTMLSpanElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)
  const { locale } = useLocale()
  useAltimeter({ markerRef, valueRef }, ALTITUDE_RANGE, locale)

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
    >
      <div className="relative h-[200px] w-9 rounded-full border border-deck-border bg-deck shadow-object after:shadow-bevel after:absolute after:-inset-px after:rounded-full after:content-['']">
        <div className="absolute inset-y-4 left-1/2 flex -translate-x-1/2 flex-col justify-between">
          {Array.from({ length: TICK_COUNT }, (_, i) => (
            <span key={i} className={i % 5 === 0 ? 'h-px w-3 bg-ink/70' : 'mx-auto h-px w-1.5 bg-ink/35'} />
          ))}
        </div>
        <span
          ref={markerRef}
          className="absolute left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-ink bg-gold [bottom:calc(16px+var(--altitude-progress,0)*(100%-32px))]"
        />
      </div>
      <p className="flex flex-col items-center rounded-2xl border border-deck-border bg-deck px-2.5 py-1.5 font-mono text-ink shadow-object">
        <span className="text-[9px] tracking-[1.4px] text-ink/60 uppercase">{altimeterContent[locale].label}</span>
        <span ref={valueRef} className="text-[11px] tabular-nums">
          {toAltitudeLabel(ALTITUDE_RANGE.baseAltitudeM, locale)}
        </span>
      </p>
    </aside>
  )
}
