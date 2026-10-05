import { useRef, type CSSProperties } from 'react'
import { BagItemList } from '@/components/bag/BagItemList'
import { BagStage } from '@/components/bag/BagStage'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
import { PaintedScene } from '@/components/scene/PaintedScene'
import { COL_SCENE } from '@/components/scene/scenes'
import { bagContent } from '@/content/bag'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { usePackingTimeline } from '@/hooks/usePackingTimeline'

const SCROLL_STEPS_AFTER_ITEMS = 1

export function Bag() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  usePackingTimeline({ sectionRef, trackRef })

  const { eyebrow, title, intro, items, ...images } = useLocalized(bagContent)
  const scrollSteps = items.length + SCROLL_STEPS_AFTER_ITEMS

  return (
    <section ref={sectionRef} id={SECTION_IDS.method} className="relative z-2 bg-section-alt">
      <RidgeEdge variant="west" frontClassName="fill-section-alt" backClassName="fill-section-alt/50" />
      <div
        ref={trackRef}
        style={{ '--packing-steps': scrollSteps } as CSSProperties}
        className="relative lg:motion-safe:h-[calc(var(--packing-steps)*100vh)]"
      >
        <div className="relative isolate grid items-center gap-[clamp(24px,4vw,40px)] px-6 py-[clamp(64px,10vw,96px)] lg:sticky lg:top-0 lg:h-screen lg:grid-cols-[1fr_0.8fr] lg:px-[max(24px,calc((100vw-1240px)/2))] lg:pt-24 lg:pb-8">
          <PaintedScene layers={COL_SCENE} imageClassName="object-[70%_bottom]" className="-z-1" />
          <div className="absolute inset-0 -z-1 max-lg:bg-section-alt/70 lg:bg-linear-to-r lg:from-section-alt/90 lg:via-section-alt/50 lg:to-transparent" />
          <div className="absolute inset-x-0 top-0 -z-1 h-40 bg-linear-to-b from-section-alt to-transparent" />
          <div className="absolute inset-x-0 bottom-0 -z-1 h-24 bg-linear-to-b from-transparent to-col-grass" />
          <div className="max-w-[620px] max-lg:mx-auto max-lg:w-full">
            <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-ink/60 uppercase">
              <span className="size-2 rounded-full bg-trail" />
              {eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(34px,2.4vw+26px,58px)] leading-none">{title}</h2>
            <p className="mt-3 text-lg text-ink/70">{intro}</p>
            <BagItemList items={items} />
          </div>
          <div className="flex h-[clamp(260px,45vh,440px)] items-end justify-center max-lg:order-first lg:h-full lg:max-h-[70vh] lg:self-end">
            <BagStage items={items} {...images} />
          </div>
        </div>
      </div>
      <div className="h-[90px] bg-col-grass sm:h-[160px]" aria-hidden="true" />
    </section>
  )
}
