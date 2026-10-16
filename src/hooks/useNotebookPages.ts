import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const PINNED_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px)`
const PAGE_SHIFT_PX = 18

interface NotebookRefs {
  sectionRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
}

export function useNotebookPages({ sectionRef, trackRef }: NotebookRefs) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(PINNED_LAYOUT_QUERY, () => {
        const pages = gsap.utils.toArray<HTMLElement>('[data-notebook-page]')
        const counters = gsap.utils.toArray<HTMLElement>('[data-notebook-counter]')
        gsap.set(pages.slice(1), { opacity: 0, x: PAGE_SHIFT_PX })
        gsap.set(counters.slice(1), { opacity: 0 })
        const timeline = gsap.timeline({
          defaults: { ease: 'power1.inOut', duration: 0.4 },
          scrollTrigger: { trigger: trackRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })
        pages.slice(1).forEach((page, i) => {
          const step = `page${i}`
          timeline
            .to(pages[i], { opacity: 0, x: -PAGE_SHIFT_PX }, `${step}+=0.6`)
            .to(counters[i], { opacity: 0 }, '<')
            .to(page, { opacity: 1, x: 0 }, '>-0.1')
            .to(counters[i + 1], { opacity: 1 }, '<')
        })
        timeline.to({}, { duration: 0.6 })
      })
      return () => media.revert()
    },
    { scope: sectionRef },
  )
}
