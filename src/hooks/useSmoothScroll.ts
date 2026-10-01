import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useMediaQuery'

const MS_PER_S = 1000
const DEFAULT_LAG_THRESHOLD_MS = 500
const DEFAULT_ADJUSTED_LAG_MS = 33

export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const lenis = new Lenis({ anchors: true })
    const unsubscribe = lenis.on('scroll', ScrollTrigger.update)
    const tick = (timeS: number) => lenis.raf(timeS * MS_PER_S)

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(DEFAULT_LAG_THRESHOLD_MS, DEFAULT_ADJUSTED_LAG_MS)
      unsubscribe()
      lenis.destroy()
    }
  }, [prefersReducedMotion])
}
