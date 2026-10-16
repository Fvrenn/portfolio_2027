import { useRef, useState, type CSSProperties } from 'react'
import { SceneImage } from '@/components/scene/SceneImage'
import { HALTE_PANORAMA_PATH, HALTE_PERSO_PATH } from '@/components/scene/scenes'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { useBinocularView } from '@/hooks/useBinocularView'
import { useValleyTimeline } from '@/hooks/useValleyTimeline'
import { BinocularLayers } from './BinocularLayers'
import { FeatureCard } from './FeatureCard'
import { LANDMARK_POSITIONS } from './landmarks'
import { ObservationSheet } from './ObservationSheet'
import { ProblemCard } from './ProblemCard'
import { FOG_BANDS, getValleyDuration, SCROLL_VH_PER_PHASE } from './valleyLayout'

interface ValleyStageProps {
  project: Project
  detail: ProjectDetail
  labels: HalteLabels
}

const HALF = 50
const sideCard = 'absolute top-[clamp(88px,12vh,128px)] w-[min(440px,34vw)]'
const sideGutter = 'max(88px, calc((100vw - 1240px) / 2))'

export function ValleyStage({ project, detail, labels }: ValleyStageProps) {
  const stageRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { features } = detail
  const activeLandmark = features[activeIndex].landmark
  const focus = LANDMARK_POSITIONS[activeLandmark]

  useBinocularView(canvasRef, focus)
  useValleyTimeline({ stageRef, trackRef }, { featureCount: features.length, onFeatureChange: setActiveIndex })

  const isLandmarkOnLeft = focus.xPercent < HALF

  return (
    <section ref={stageRef} className="relative bg-cream">
      <div
        ref={trackRef}
        style={{ '--valley-scroll': `${getValleyDuration(features.length) * SCROLL_VH_PER_PHASE}vh` } as CSSProperties}
        className="relative h-[calc(100vh+var(--valley-scroll))]"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={canvasRef}
            className="cover-canvas isolate [--focus-x:0.18] [--focus-y:0.22] [--lens:clamp(70px,8vw,140px)] [--view-x:50%] [--view-y:50%]"
          >
            <SceneImage path={HALTE_PANORAMA_PATH} className="absolute inset-0" />
            <div data-valley-haze className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/75 via-white/45 to-white/10 opacity-0" />
            {FOG_BANDS.map((band, i) => (
              <img
                key={i}
                src={band.src}
                alt=""
                aria-hidden="true"
                decoding="async"
                data-fog-band
                data-fog-direction={band.driftDirection}
                data-fog-opacity={band.opacity}
                style={{ top: `${band.topPercent}%`, left: `${band.leftPercent}%`, width: `${band.widthPercent}%` }}
                className={`pointer-events-none absolute h-auto max-w-none opacity-0 ${band.isFlipped ? '-scale-x-100' : ''}`}
              />
            ))}
            <div data-valley-hiker className="pointer-events-none absolute inset-0" aria-hidden="true">
              <SceneImage path={HALTE_PERSO_PATH} />
            </div>
            <BinocularLayers
              features={features}
              activeLandmark={activeLandmark}
              landmarkNames={labels.binoculars.landmarks}
              onSelect={(landmark) => setActiveIndex(features.findIndex((feature) => feature.landmark === landmark))}
              className="opacity-0"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[14vh] bg-linear-to-b from-transparent to-cream" />
          <div data-valley-sheet className={sideCard} style={{ right: sideGutter }}>
            <ObservationSheet project={project} detail={detail} labels={labels} />
          </div>
          <div data-valley-problem className="invisible absolute bottom-[16vh] w-[min(520px,40vw)] opacity-0" style={{ right: sideGutter }}>
            <ProblemCard problem={detail.problem} labels={labels.mist} />
          </div>
          <div
            data-valley-feature
            className={`${sideCard} invisible opacity-0 transition-[left] duration-700 ease-out`}
            style={{ left: isLandmarkOnLeft ? `calc(100vw - min(440px,34vw) - ${sideGutter})` : sideGutter }}
          >
            <FeatureCard features={features} activeIndex={activeIndex} url={project.url} labels={labels.binoculars} onSelect={setActiveIndex} />
          </div>
        </div>
      </div>
    </section>
  )
}
