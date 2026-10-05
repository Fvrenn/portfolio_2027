import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const LINE_SELECTOR = '[data-profile-line]'
const STOP_SELECTOR = '[data-profile-stop]'

export function useProfileDraw(profileRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: profileRef.current, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        })
        timeline.fromTo(LINE_SELECTOR, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
        gsap.utils.toArray<HTMLElement>(STOP_SELECTOR).forEach((stop, i, stops) => {
          timeline.from(stop, { scale: 0, opacity: 0, duration: 0.08, ease: 'back.out(3)' }, (i + 0.5) / stops.length - 0.04)
        })
      })
      return () => media.revert()
    },
    { scope: profileRef },
  )
}
