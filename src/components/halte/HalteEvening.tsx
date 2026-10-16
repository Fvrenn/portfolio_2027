import { useRef } from 'react'
import { SceneImage } from '@/components/scene/SceneImage'
import { HALTE_PANORAMA_PATH, HALTE_PERSO_STANDING_PATH } from '@/components/scene/scenes'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Signpost } from '@/components/ui/Signpost'
import { TrailSign } from '@/components/ui/TrailSign'
import { toHalteAltitudeRange } from '@/content/altimeter'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { SECTION_IDS, toAnchor } from '@/content/sections'
import { useSceneParallax } from '@/hooks/useSceneParallax'
import { toWalkingTimeLabel } from '@/lib/format'
import { getWalkingMinutes } from '@/lib/hiking'
import { toProjectPath } from '@/lib/routes'

interface HalteEveningProps {
  project: Project
  detail: ProjectDetail
  nextProject: Project
  labels: HalteLabels
}

export function HalteEvening({ project, detail, nextProject, labels }: HalteEveningProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useSceneParallax(sectionRef)
  const { sunset, departure } = labels
  const belvedere = toHalteAltitudeRange(project.altitudeM)
  const toNextStage = toWalkingTimeLabel(getWalkingMinutes(belvedere.summitAltitudeM, nextProject.altitudeM))
  const toTrail = toWalkingTimeLabel(getWalkingMinutes(belvedere.summitAltitudeM, belvedere.baseAltitudeM))

  return (
    <section ref={sectionRef} className="relative isolate overflow-x-clip bg-cream">
      <div className="relative bg-linear-to-b from-cream via-golden-hour to-golden-low px-6 pt-[clamp(64px,10vw,140px)] pb-[clamp(160px,22vw,320px)]">
        <span
          aria-hidden="true"
          data-scene-depth="1.5"
          className="absolute bottom-[clamp(60px,10vw,150px)] left-[70%] size-[clamp(160px,22vw,340px)] -translate-x-1/2 rounded-full bg-gold/80 blur-2xl"
        />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-[640px] lg:ml-auto lg:w-1/2">
            <EyebrowHeading eyebrow={sunset.eyebrow} title={sunset.title} />
            <p className="mt-5 font-serif text-[clamp(20px,1vw+16px,28px)] leading-snug text-ink/85">{detail.learned}</p>
          </div>
        </div>
      </div>
      <div className="relative -mt-[clamp(160px,22vw,320px)] aspect-[3/2] max-h-[115vh] w-full">
        <div className="absolute inset-0 overflow-hidden mask-t-from-60%">
          <SceneImage path={HALTE_PANORAMA_PATH} className="object-[50%_12%]" />
          <div className="absolute inset-0 bg-golden-low/30 mix-blend-multiply" />
        </div>
        <SceneImage path={HALTE_PERSO_STANDING_PATH} className="pointer-events-none absolute inset-0 object-[50%_12%]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-b from-transparent to-cream" />
      </div>
      <div className="relative mx-auto grid max-w-[1240px] items-start gap-[clamp(24px,4vw,48px)] px-6 pb-[clamp(64px,10vw,112px)] lg:grid-cols-2">
        <div>
          <EyebrowHeading eyebrow={departure.eyebrow} title={departure.title} />
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li key={technology} className="border border-topo/60 px-2.5 py-1 font-mono text-sm text-ink/75">
                {technology}
              </li>
            ))}
          </ul>
        </div>
        <Signpost className="w-full max-w-[460px] lg:justify-self-end">
          <TrailSign
            href={toProjectPath(nextProject.slug)}
            eyebrow={`${departure.nextLabel} · ${nextProject.stage}`}
            title={nextProject.title}
            walkingTime={toNextStage}
          />
          <TrailSign href={toAnchor(SECTION_IDS.projects)} title={labels.backLabel} walkingTime={toTrail} className="w-[88%]" />
        </Signpost>
      </div>
    </section>
  )
}
