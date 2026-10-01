import { useRef } from 'react'
import { Compass } from '@/components/compass/Compass'
import { Landscape } from '@/components/landscape/Landscape'
import { SKY_PATH } from '@/components/landscape/layers'
import { PaintedLayer } from '@/components/landscape/PaintedLayer'
import { heroContent } from '@/content/hero'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { useFitScale } from '@/hooks/useFitScale'
import { useHeroParallax } from '@/hooks/useHeroParallax'
import { HeroHeading } from './HeroHeading'
import { SkyGroup } from './SkyGroup'

const COMPOSITION_WIDTH_PX = 1080

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const compositionRef = useRef<HTMLDivElement>(null)
  useHeroParallax(heroRef)
  useFitScale(compositionRef, COMPOSITION_WIDTH_PX)

  const { compass, ...headingContent } = useLocalized(heroContent)

  return (
    <section
      ref={heroRef}
      id={SECTION_IDS.top}
      className="sticky top-0 z-1 h-screen overflow-hidden bg-sky-from [--sun-w:300px] sm:[--sun-w:clamp(300px,40vw,620px)] desktop:[--sun-w:clamp(300px,44vw,680px)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <PaintedLayer path={SKY_PATH} />
      </div>
      <SkyGroup />
      <Landscape />
      <div data-hero-content className="absolute inset-0 origin-center will-change-transform">
        <div
          ref={compositionRef}
          className="absolute inset-0 flex flex-col items-center justify-start gap-4 px-4 pt-[18vh] sm:block sm:px-0 sm:pt-0"
        >
          <HeroHeading {...headingContent} />
          <Compass
            {...compass}
            className="max-sm:hidden sm:absolute sm:top-[calc(50vh+90px)] sm:left-[calc(50%+40px)] desktop:top-[calc(50vh-75px)] desktop:left-[calc(50%-350px)]"
          />
        </div>
      </div>
    </section>
  )
}
