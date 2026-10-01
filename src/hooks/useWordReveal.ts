import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const WORD_SELECTOR = '[data-word]'
const DIMMED_OPACITY = 0.14

export function useWordReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.fromTo(
          WORD_SELECTOR,
          { opacity: DIMMED_OPACITY },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', end: 'bottom 50%', scrub: true },
          },
        )
      })
      return () => media.revert()
    },
    { scope: containerRef },
  )
}
