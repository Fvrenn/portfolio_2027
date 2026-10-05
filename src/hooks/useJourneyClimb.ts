import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'
import { revealOnScroll } from './useRevealOnScroll'

const STAIRCASE_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1280px)`
const STACKED_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (max-width: 1279px)`
const STEP_SELECTOR = '[data-journey-step]'
const HIDDEN_CONNECTOR_CLIP = 'inset(0% 100% 0% 0%)'
const SHOWN_CONNECTOR_CLIP = 'inset(0% 0% 0% 0%)'
const STEP_OFFSET_PX = 32

export function useJourneyClimb(climbRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(STAIRCASE_LAYOUT_QUERY, () => buildClimbTimeline(climbRef.current))
      media.add(STACKED_LAYOUT_QUERY, () => gsap.utils.toArray<HTMLElement>(STEP_SELECTOR).forEach(revealOnScroll))
      return () => media.revert()
    },
    { scope: climbRef },
  )
}

function buildClimbTimeline(climb: HTMLElement | null) {
  if (!climb) return
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: { trigger: climb, start: 'top 85%', end: 'top 40%', scrub: 0.6 },
  })

  gsap.utils.toArray<HTMLElement>(STEP_SELECTOR).forEach((step) => {
    const connector = step.querySelector('[data-step-connector]')
    if (connector) {
      timeline.fromTo(connector, { clipPath: HIDDEN_CONNECTOR_CLIP }, { clipPath: SHOWN_CONNECTOR_CLIP, duration: 0.5, ease: 'none' })
    }
    timeline
      .from(step.querySelector('[data-step-marker]'), { scale: 0, duration: 0.25, ease: 'back.out(2.5)' })
      .from(step, { opacity: 0, y: STEP_OFFSET_PX, duration: 0.5 }, '<')
      .from(step.querySelector('[data-step-scenery]'), { scale: 0, opacity: 0, transformOrigin: '50% 100%', duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
  })
}
