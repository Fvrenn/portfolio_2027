import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const SIDE_BY_SIDE_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px)`
const INACTIVE_STEP_OPACITY = 0.35

interface MapStringRefs {
  sectionRef: RefObject<HTMLElement | null>
  stepsRef: RefObject<HTMLElement | null>
}

export function useMapString({ sectionRef, stepsRef }: MapStringRefs) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(SIDE_BY_SIDE_QUERY, () => {
        const segments = gsap.utils.toArray<SVGPathElement>('[data-map-segment]')
        const pins = gsap.utils.toArray<HTMLElement>('[data-map-pin]')
        const steps = gsap.utils.toArray<HTMLElement>('[data-map-step]')
        gsap.set(segments, { strokeDashoffset: 1 })
        gsap.set(pins.slice(1), { scale: 0, opacity: 0 })
        gsap.set(steps.slice(1), { opacity: INACTIVE_STEP_OPACITY })

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: stepsRef.current, start: 'top 55%', end: 'bottom 70%', scrub: 0.6 },
        })
        segments.forEach((segment, i) => {
          timeline
            .to(segment, { strokeDashoffset: 0, duration: 1 }, i)
            .to(pins[i + 1], { scale: 1, opacity: 1, duration: 0.15, ease: 'back.out(2.5)' }, i + 0.9)
            .to(steps[i + 1], { opacity: 1, duration: 0.15 }, i + 0.9)
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef },
  )
}
