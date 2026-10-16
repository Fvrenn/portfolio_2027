import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const DROP_PX = 90
const DROP_TILT_DEG = 14

export function useHangingPolaroids(lineRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.from('[data-polaroid]', {
          y: -DROP_PX,
          rotation: (i) => (i % 2 === 0 ? -DROP_TILT_DEG : DROP_TILT_DEG),
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          stagger: 0.12,
          scrollTrigger: { trigger: lineRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        })
      })
      return () => media.revert()
    },
    { scope: lineRef },
  )
}
