import { useRef, type RefObject } from 'react'
import { FEATURE_STEP, getValleyDuration, VALLEY_PHASES } from '@/components/halte/valleyLayout'
import { gsap, useGSAP } from '@/lib/gsap'
import { clamp } from '@/lib/math'

const FOG_DRIFT_PERCENT = 45
const CARD_SHIFT_PX = 40

interface ValleyRefs {
  stageRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
}

interface ValleyOptions {
  featureCount: number
  onFeatureChange: (index: number) => void
}

export function useValleyTimeline({ stageRef, trackRef }: ValleyRefs, { featureCount, onFeatureChange }: ValleyOptions) {
  const onFeatureChangeRef = useRef(onFeatureChange)
  onFeatureChangeRef.current = onFeatureChange

  useGSAP(
    () => {
      const duration = getValleyDuration(featureCount)
      let activeIndex = 0
      const timeline = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const elapsed = self.progress * duration - VALLEY_PHASES.featuresStart
            const index = clamp(Math.floor(elapsed / FEATURE_STEP), 0, featureCount - 1)
            if (index === activeIndex) return
            activeIndex = index
            onFeatureChangeRef.current(index)
          },
        },
      })

      timeline.to('[data-valley-sheet]', { autoAlpha: 0, y: -CARD_SHIFT_PX, duration: 0.4 }, VALLEY_PHASES.sheetOut)
      gsap.utils.toArray<HTMLElement>('[data-fog-band]').forEach((band) => {
        const direction = Number(band.dataset.fogDirection)
        timeline
          .fromTo(
            band,
            { xPercent: -direction * FOG_DRIFT_PERCENT, opacity: 0 },
            { xPercent: 0, opacity: Number(band.dataset.fogOpacity), duration: 0.8 },
            VALLEY_PHASES.fogIn,
          )
          .to(band, { xPercent: direction * FOG_DRIFT_PERCENT, opacity: 0, duration: 0.8 }, VALLEY_PHASES.fogOut)
      })
      timeline
        .to('[data-valley-haze]', { opacity: 1, duration: 0.8 }, VALLEY_PHASES.fogIn)
        .to('[data-valley-haze]', { opacity: 0, duration: 0.8 }, VALLEY_PHASES.fogOut)
        .fromTo('[data-valley-problem]', { autoAlpha: 0, y: CARD_SHIFT_PX }, { autoAlpha: 1, y: 0, duration: 0.4 }, VALLEY_PHASES.problemIn)
        .to('[data-valley-problem]', { autoAlpha: 0, y: -CARD_SHIFT_PX, duration: 0.4 }, VALLEY_PHASES.fogOut)
        .to('[data-valley-hiker]', { opacity: 0, duration: 0.4 }, VALLEY_PHASES.binocularsIn)
        .to('[data-binocular-layer]', { opacity: 1, duration: 0.4 }, VALLEY_PHASES.binocularsIn)
        .fromTo(
          '[data-valley-feature]',
          { autoAlpha: 0, y: CARD_SHIFT_PX },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          VALLEY_PHASES.binocularsIn + 0.2,
        )
        .set({}, {}, duration)
    },
    { scope: stageRef, dependencies: [featureCount], revertOnUpdate: true },
  )
}
