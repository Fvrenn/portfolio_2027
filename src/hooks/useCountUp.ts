import type { RefObject } from 'react'
import type { Locale } from '@/i18n/locale'
import { toCountLabel } from '@/lib/format'
import { gsap, useGSAP } from '@/lib/gsap'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

const COUNT_DURATION_S = 1.6

export function useCountUp(scopeRef: RefObject<HTMLElement | null>, locale: Locale) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((element) => {
          const target = Number(element.dataset.countTo)
          const counter = { value: 0 }
          element.textContent = toCountLabel(counter.value, locale)
          gsap.to(counter, {
            value: target,
            duration: COUNT_DURATION_S,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = toCountLabel(counter.value, locale)
            },
            scrollTrigger: { trigger: element, start: 'top 85%', once: true },
          })
        })
      })
      return () => media.revert()
    },
    { scope: scopeRef, dependencies: [locale], revertOnUpdate: true },
  )
}
