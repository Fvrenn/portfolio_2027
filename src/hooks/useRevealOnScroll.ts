import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const REVEAL_SELECTOR = '[data-reveal]'
const REVEAL_OFFSET_PX = 48

export function useRevealOnScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: REVEAL_OFFSET_PX,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 85%', toggleActions: 'play none none reverse' },
          })
        })
      })
      return () => media.revert()
    },
    { scope: scopeRef },
  )
}
