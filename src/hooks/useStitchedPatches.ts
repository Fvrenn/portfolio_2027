import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const DROP_SCALE = 1.8
const DROP_TILT_DEG = 22

export function useStitchedPatches(scarfRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.from('[data-patch]', {
          scale: DROP_SCALE,
          rotation: (i) => (i % 2 === 0 ? -DROP_TILT_DEG : DROP_TILT_DEG),
          opacity: 0,
          duration: 0.55,
          ease: 'back.out(2.2)',
          stagger: 0.2,
          scrollTrigger: { trigger: scarfRef.current, start: 'top 65%', toggleActions: 'play none none reverse' },
        })
      })
      return () => media.revert()
    },
    { scope: scarfRef },
  )
}
