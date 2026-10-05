import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const LAYER_SELECTOR = '[data-scene-depth]'
const SCROLL_TRAVEL_PX = 32

export function useSceneParallax(sceneRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.utils.toArray<HTMLElement>(LAYER_SELECTOR).forEach((layer) => {
          const travelPx = Number(layer.dataset.sceneDepth) * SCROLL_TRAVEL_PX
          gsap.fromTo(
            layer,
            { y: -travelPx },
            { y: travelPx, ease: 'none', scrollTrigger: { trigger: sceneRef.current, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
      return () => media.revert()
    },
    { scope: sceneRef },
  )
}
