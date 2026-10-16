import { useRef } from 'react'
import { PaintedScene } from '@/components/scene/PaintedScene'
import { HALTE_SCENE } from '@/components/scene/scenes'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { useSceneParallax } from '@/hooks/useSceneParallax'
import { ObservationSheet } from './ObservationSheet'

interface HalteHeroProps {
  project: Project
  detail: ProjectDetail
  labels: HalteLabels
}

export function HalteHero({ project, detail, labels }: HalteHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useSceneParallax(sectionRef)

  return (
    <section ref={sectionRef} className="relative isolate overflow-x-clip bg-cream">
      <div className="relative h-[clamp(420px,72svh,680px)] lg:h-svh lg:min-h-[680px]">
        <PaintedScene layers={HALTE_SCENE} imageClassName="object-[18%_22%]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-b from-transparent to-cream" />
      </div>
      <div className="relative -mt-[clamp(48px,12vw,140px)] px-6 pb-[clamp(48px,8vw,80px)] lg:absolute lg:top-[clamp(96px,14vh,150px)] lg:right-[max(88px,calc((100vw-1240px)/2))] lg:mt-0 lg:w-[min(480px,40vw)] lg:p-0">
        <ObservationSheet project={project} detail={detail} labels={labels} />
      </div>
    </section>
  )
}
