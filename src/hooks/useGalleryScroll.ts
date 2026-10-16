import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const PINNED_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px)`

interface GalleryRefs {
  trackRef: RefObject<HTMLElement | null>
  rowRef: RefObject<HTMLElement | null>
}

export function useGalleryScroll({ trackRef, rowRef }: GalleryRefs) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(PINNED_LAYOUT_QUERY, () => {
        const row = rowRef.current
        if (!row) return
        gsap.to(row, {
          x: () => -(row.scrollWidth - row.clientWidth),
          ease: 'none',
          scrollTrigger: { trigger: trackRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true },
        })
        gsap.utils.toArray<HTMLElement>('[data-gallery-shot]').forEach((shot, i) => {
          gsap.from(shot, { rotate: i % 2 === 0 ? -3 : 3, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: trackRef.current, start: 'top 70%' } })
        })
      })
      return () => media.revert()
    },
    { scope: trackRef },
  )
}
