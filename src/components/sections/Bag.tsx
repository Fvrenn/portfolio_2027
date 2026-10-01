import { useRef, type CSSProperties } from 'react'
import { BagItemList } from '@/components/bag/BagItemList'
import { BagStage } from '@/components/bag/BagStage'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
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
        className="relative sm:motion-safe:h-[calc(var(--packing-steps)*100vh)]"
      >
        <div className="grid items-center gap-10 px-6 py-24 sm:sticky sm:top-0 sm:h-screen sm:grid-cols-[1fr_0.8fr] sm:pt-24 sm:pb-8 lg:px-[max(24px,calc((100vw-1240px)/2))]">
          <div className="max-w-[620px]">
            <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-ink/60 uppercase">
              <span className="size-2 rounded-full bg-trail" />
              {eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[clamp(38px,4vw,58px)] leading-none">{title}</h2>
            <p className="mt-3 text-lg text-ink/70">{intro}</p>
            <BagItemList items={items} />
          </div>
          <div className="flex h-[52vh] items-end justify-center max-sm:order-first sm:h-full sm:max-h-[70vh] sm:self-end">
            <BagStage items={items} {...images} />
          </div>
        </div>
      </div>
    </section>
  )
}
