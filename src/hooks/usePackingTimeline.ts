import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const PINNED_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px)`
const INACTIVE_ENTRY_OPACITY = 0.45
const DROP_START_OFFSET = -0.55
const HOVER_OFFSET = -0.1
const INSIDE_OFFSET = 0.16
const PACKED_SCALE = 0.55

interface PackingRefs {
  sectionRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
}

export function usePackingTimeline({ sectionRef, trackRef }: PackingRefs) {
  useGSAP(
    () => {
      const media = gsap.matchMedia(sectionRef.current ?? undefined)
      media.add(PINNED_LAYOUT_QUERY, () => {
        const stage = sectionRef.current?.querySelector<HTMLElement>('[data-bag-stage]')
        if (!stage || !trackRef.current) return
        const stageOffset = (ratio: number) => () => stage.offsetHeight * ratio

        const items = gsap.utils.toArray<HTMLElement>('[data-bag-item]')
        const entries = gsap.utils.toArray<HTMLElement>('[data-bag-entry]')
        const details = gsap.utils.toArray<HTMLElement>('[data-bag-detail]')
        gsap.set(entries, { opacity: INACTIVE_ENTRY_OPACITY })
        gsap.set(details, { height: 0 })
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: trackRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true },
        })

        timeline
          .set('[data-bag-open]', { opacity: 1 })
          .set('[data-bag-closed]', { opacity: 0 })

        items.forEach((item, i) => {
          const step = `item${i}`
          timeline
            .to(entries, { opacity: INACTIVE_ENTRY_OPACITY, duration: 0.2 }, step)
            .to(details, { height: 0, duration: 0.2 }, step)
            .to(entries[i], { opacity: 1, duration: 0.2 }, step)
            .to(details[i], { height: 'auto', duration: 0.2 }, step)
            .fromTo(
              item,
              { y: stageOffset(DROP_START_OFFSET), rotation: -14, opacity: 0, scale: 1 },
              { y: stageOffset(HOVER_OFFSET), rotation: 6, opacity: 1, duration: 0.5, ease: 'power2.out' },
              step,
            )
            .to(item, { y: stageOffset(INSIDE_OFFSET), rotation: 0, scale: PACKED_SCALE, duration: 0.4, ease: 'power2.in' })
            .to('[data-bag-body]', { scaleY: 0.97, scaleX: 1.02, duration: 0.06, yoyo: true, repeat: 1 })
            .set(item, { opacity: 0 })
        })

        timeline
          .to('[data-bag-body]', { scaleY: 0.93, scaleX: 1.04, duration: 0.12, ease: 'power2.in' }, 'close')
          .to(entries, { opacity: 1, duration: 0.2 }, 'close')
          .set('[data-bag-open]', { opacity: 0 })
          .set('[data-bag-closed]', { opacity: 1 })
          .to('[data-bag-body]', { scaleY: 1, scaleX: 1, duration: 0.2, ease: 'back.out(3)' })
      })
      return () => media.revert()
    },
    { scope: sectionRef },
  )
}
