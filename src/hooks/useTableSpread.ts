import type { RefObject } from 'react'
import { TABLE_CARD_TILTS } from '@/components/about/aboutLayout'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const PINNED_LAYOUT_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px) and (min-height: 720px)`
const STACKED_SCALE = 0.82
const HALF = 2

interface TableRefs {
  trackRef: RefObject<HTMLElement | null>
  gridRef: RefObject<HTMLElement | null>
}

export function useTableSpread({ trackRef, gridRef }: TableRefs) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(PINNED_LAYOUT_QUERY, () => {
        const grid = gridRef.current
        if (!grid) return
        const cards = gsap.utils.toArray<HTMLElement>('[data-table-card]')
        gsap.from(cards, {
          x: (_, card: HTMLElement) => grid.offsetWidth / HALF - (card.offsetLeft + card.offsetWidth / HALF),
          y: (_, card: HTMLElement) => grid.offsetHeight / HALF - (card.offsetTop + card.offsetHeight / HALF),
          rotation: (i) => TABLE_CARD_TILTS[i % TABLE_CARD_TILTS.length],
          scale: STACKED_SCALE,
          ease: 'power2.inOut',
          stagger: 0.06,
          scrollTrigger: { trigger: trackRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true },
        })
      })
      return () => media.revert()
    },
    { scope: trackRef },
  )
}
