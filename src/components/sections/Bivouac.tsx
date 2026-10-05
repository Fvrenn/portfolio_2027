import { useRef } from 'react'
import { LogbookPanel } from '@/components/bivouac/LogbookPanel'
import { StackPanel } from '@/components/bivouac/StackPanel'
import { PaintedScene } from '@/components/scene/PaintedScene'
import { BIVOUAC_SCENE } from '@/components/scene/scenes'
import { bivouacContent } from '@/content/bivouac'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useSceneParallax } from '@/hooks/useSceneParallax'

export function Bivouac() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  useRevealOnScroll(sectionRef)
  useSceneParallax(sceneRef)

  const { eyebrow, title, intro } = useLocalized(bivouacContent)

  return (
    <section ref={sectionRef} id={SECTION_IDS.gear} className="relative z-2 bg-night text-cream-text">
      <div className="relative">
        <div ref={sceneRef} className="relative aspect-[3/2] max-h-screen w-full bg-night-sky">
          <PaintedScene layers={BIVOUAC_SCENE} imageClassName="object-[20%_bottom]" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-night-sky to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-b from-transparent to-night" />
        </div>
        <div data-reveal className="px-6 pt-6 lg:absolute lg:top-[14%] lg:right-[6vw] lg:max-w-[440px] lg:p-0">
          <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-cream-text/70 uppercase">
            <span className="size-2 rounded-full bg-campfire" />
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-[clamp(38px,4.6vw,64px)] leading-none">{title}</h2>
          <p className="mt-4 text-lg text-cream-text/80">{intro}</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1240px] items-start gap-6 px-6 pt-[clamp(32px,5vw,48px)] pb-[clamp(160px,18vw,224px)] lg:grid-cols-2">
        <StackPanel />
        <LogbookPanel />
      </div>
    </section>
  )
}
