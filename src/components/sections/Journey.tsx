import { useRef } from 'react'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
import { TopoLines } from '@/components/decor/TopoLines'
import { EducationBand } from '@/components/journey/EducationBand'
import { JourneySteps } from '@/components/journey/JourneySteps'
import { ScoutingCard } from '@/components/journey/ScoutingCard'
import { PaintedScene } from '@/components/scene/PaintedScene'
import { REFUGE_SCENE } from '@/components/scene/scenes'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { journeyContent } from '@/content/journey'
import { SECTION_IDS } from '@/content/sections'
import { useJourneyClimb } from '@/hooks/useJourneyClimb'
import { useLocalized } from '@/hooks/useLocale'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useSceneParallax } from '@/hooks/useSceneParallax'

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const climbRef = useRef<HTMLDivElement>(null)
  useRevealOnScroll(sectionRef)
  useSceneParallax(sceneRef)
  useJourneyClimb(climbRef)

  const { eyebrow, title, intro, company, steps, educationLabel, education, scouting } = useLocalized(journeyContent)

  return (
    <section ref={sectionRef} id={SECTION_IDS.journey} className="relative z-2 bg-cream">
      <RidgeEdge variant="refuge" frontClassName="fill-refuge-sky" backClassName="fill-mist/70" />
      <div className="relative">
        <div ref={sceneRef} className="relative aspect-[3/2] max-h-screen w-full bg-refuge-sky">
          <PaintedScene layers={REFUGE_SCENE} imageClassName="object-[75%_bottom]" />
          <div className="absolute inset-x-0 top-0 h-1/5 bg-linear-to-b from-refuge-sky to-transparent" />
          <div className="absolute inset-y-0 left-0 w-3/5 bg-linear-to-r from-cream/60 to-transparent max-lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-cream" />
        </div>
        <div className="px-6 pt-8 lg:absolute lg:top-[18%] lg:left-[max(24px,calc((100vw-1240px)/2))] lg:max-w-[560px] lg:p-0">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        </div>
      </div>
      <div className="relative">
        <TopoLines />
        <div className="relative mx-auto max-w-[1240px] px-6 pt-[clamp(24px,4vw,40px)]">
          <p data-reveal className="max-w-[640px] text-ink/70">
            <span className="font-serif text-xl text-ink">{company.name}</span> — {company.description}
          </p>
          <div ref={climbRef}>
            <JourneySteps steps={steps} />
          </div>
          <EducationBand label={educationLabel} education={education} />
          <ScoutingCard {...scouting} />
        </div>
        <div className="relative mt-[clamp(56px,8vw,80px)] h-[clamp(240px,45vh,420px)] bg-linear-to-b from-cream via-dusk-mid/70 to-night-sky" aria-hidden="true" />
      </div>
    </section>
  )
}
