import { useRef } from 'react'
import { SceneImage } from '@/components/scene/SceneImage'
import { LuggageTag } from '@/components/ui/LuggageTag'
import { NotebookPage } from '@/components/ui/NotebookPage'
import type { AboutContent } from '@/content/about'
import { ABOUT_IMAGES } from '@/content/aboutImages'
import { useCountUp } from '@/hooks/useCountUp'
import { useLocale } from '@/hooks/useLocale'
import { useTableSpread } from '@/hooks/useTableSpread'
import { ExpeditionCard } from './ExpeditionCard'

const NOTE_PLACEMENTS = ['', '', '', 'lg:col-span-2']

export function CampTable({ content }: { content: AboutContent['camp'] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { locale } = useLocale()
  useTableSpread({ trackRef, gridRef })
  useCountUp(trackRef, locale)

  return (
    <section className="relative bg-cream">
      <div ref={trackRef} className="relative lg:motion-safe:tall:h-[220vh]">
        <div className="relative overflow-hidden px-6 py-[clamp(56px,8vw,96px)] lg:motion-safe:tall:sticky lg:motion-safe:tall:top-0 lg:motion-safe:tall:flex lg:motion-safe:tall:h-screen lg:motion-safe:tall:items-center lg:motion-safe:tall:py-0">
          <div className="absolute inset-0" aria-hidden="true">
            <SceneImage path={ABOUT_IMAGES.table} />
            <div className="absolute inset-x-0 top-0 h-[16%] bg-linear-to-b from-cream to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[16%] bg-linear-to-b from-transparent to-cream" />
          </div>
          <div className="relative mx-auto w-full max-w-[1240px]">
            <LuggageTag className="inline-block -rotate-2">
              <p className="pr-4 font-mono text-xs tracking-[1.4px] text-brass-deep uppercase">{content.eyebrow}</p>
              <h2 className="mt-1 pr-4 font-serif text-[clamp(28px,2vw+18px,44px)] leading-tight">{content.title}</h2>
            </LuggageTag>
            <div ref={gridRef} className="relative mt-6 grid gap-4 lg:grid-cols-3">
              <ExpeditionCard expedition={content.expedition} className="lg:col-span-2 lg:row-span-2" />
              {content.notes.map(({ label, title, text }, i) => (
                <article key={title} data-table-card className={NOTE_PLACEMENTS[i]}>
                  <NotebookPage className="h-full">
                    <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">{label}</p>
                    <h3 className="font-hand text-[28px] leading-[28px] font-bold">{title}</h3>
                    <p className="text-[15px] text-ink/80">{text}</p>
                  </NotebookPage>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
