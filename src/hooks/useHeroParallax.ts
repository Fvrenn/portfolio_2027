import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const LAYER_SELECTOR = '[data-parallax-depth]'
const CONTENT_SELECTOR = '[data-hero-content]'
const SCROLL_TRAVEL_PX = 220
const POINTER_TRAVEL_PX = 36
const CONTENT_END_SCALE = 0.88
const CONTENT_END_Y_PERCENT = -8

export function useHeroParallax(heroRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        const layers = gsap.utils.toArray<HTMLElement>(LAYER_SELECTOR)
        animateOnScroll(layers)
        return followPointer(layers)
      })
      return () => media.revert()
    },
    { scope: heroRef },
  )
}

function animateOnScroll(layers: HTMLElement[]) {
  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
  })
  timeline.to(CONTENT_SELECTOR, { scale: CONTENT_END_SCALE, yPercent: CONTENT_END_Y_PERCENT, ease: 'power1.out' }, 0)
  layers.forEach((layer) => timeline.to(layer, { y: getDepth(layer) * SCROLL_TRAVEL_PX }, 0))
}

function followPointer(layers: HTMLElement[]) {
  const moveLayers = layers.map((layer) => ({
    depth: getDepth(layer),
    moveX: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3' }),
  }))

  const handlePointerMove = (event: PointerEvent) => {
    const offset = (event.clientX / window.innerWidth - 0.5) * 2
    moveLayers.forEach(({ depth, moveX }) => moveX(-offset * depth * POINTER_TRAVEL_PX))
  }

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  return () => window.removeEventListener('pointermove', handlePointerMove)
}

const getDepth = (layer: HTMLElement) => Number(layer.dataset.parallaxDepth)
