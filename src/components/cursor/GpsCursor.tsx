import { useRef } from 'react'
import { useGpsCursor } from '@/hooks/useGpsCursor'
import { FINE_POINTER_QUERY, useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export function GpsCursor() {
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY)
  if (!hasFinePointer) return null
  return <GpsCursorMarker />
}

function GpsCursorMarker() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  useGpsCursor({ cursorRef, haloRef, labelRef }, prefersReducedMotion)

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-gps-cursor
      className="group pointer-events-none fixed top-0 left-0 z-100 opacity-0 transition-opacity duration-200 data-visible:opacity-100"
    >
      <span
        ref={haloRef}
        className="absolute -top-[19px] -left-[19px] block size-[38px] rounded-full border-[1.5px] border-gps/45 bg-gps/16 transition-[scale,background-color,border-color] duration-300 ease-out group-data-hover:scale-160 group-data-hover:border-trail group-data-hover:bg-trail/14"
      />
      <span className="absolute -top-1.5 -left-1.5 block size-3 rounded-full bg-gps shadow-[0_0_0_3px_white,0_2px_6px_rgb(0_0_0/0.3)] transition-[scale,background-color] duration-200 group-data-hover:bg-trail group-data-pressed:scale-70" />
      <span
        ref={labelRef}
        className="absolute top-4 left-6 bg-ink px-2 py-1 font-mono text-[11px] tracking-[1px] whitespace-nowrap text-cream-text uppercase opacity-0 transition-[opacity,translate] duration-200 group-data-hover:not-empty:translate-y-0 group-data-hover:not-empty:opacity-100 translate-y-1"
      />
    </div>
  )
}
