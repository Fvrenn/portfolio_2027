import type { RefObject } from 'react'
import type { Locale } from '@/i18n/locale'
import { toAltitudeLabel } from '@/lib/format'
import { lerp } from '@/lib/math'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'

interface AltimeterRefs {
  markerRef: RefObject<HTMLElement | null>
  valueRef: RefObject<HTMLElement | null>
}

interface AltitudeRange {
  baseAltitudeM: number
  summitAltitudeM: number
}

export function useAltimeter({ markerRef, valueRef }: AltimeterRefs, range: AltitudeRange, locale: Locale) {
  useGSAP(() => {
    const render = (progress: number) => {
      if (markerRef.current) markerRef.current.style.setProperty('--altitude-progress', String(progress))
      if (valueRef.current) {
        valueRef.current.textContent = toAltitudeLabel(lerp(range.baseAltitudeM, range.summitAltitudeM, progress), locale)
      }
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    })
  }, { dependencies: [locale], revertOnUpdate: true })
}
