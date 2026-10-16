import { SceneImage } from '@/components/scene/SceneImage'
import { HALTE_PANORAMA_PATH } from '@/components/scene/scenes'
import type { LandmarkId, ProjectFeature } from '@/content/projectDetails'
import { cn } from '@/lib/cn'
import { HiddenWildlife } from './HiddenWildlife'
import { LANDMARK_POSITIONS } from './landmarks'

interface BinocularLayersProps {
  features: ProjectFeature[]
  activeLandmark: LandmarkId
  landmarkNames: Record<LandmarkId, string>
  onSelect: (landmark: LandmarkId) => void
  className?: string
}

export function BinocularLayers({ features, activeLandmark, landmarkNames, onSelect, className }: BinocularLayersProps) {
  return (
    <div data-binocular-layer className={cn('absolute inset-0', className)}>
      <div className="pointer-events-none absolute inset-0 bg-ink/45" aria-hidden="true" />
      <div className="mask-binoculars pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 origin-[var(--view-x)_var(--view-y)] scale-[1.35]">
          <SceneImage path={HALTE_PANORAMA_PATH} />
          <HiddenWildlife />
        </div>
      </div>
      <BinocularRing />
      {features.map(({ landmark, title }, i) => (
        <button
          key={landmark}
          type="button"
          onClick={() => onSelect(landmark)}
          aria-pressed={landmark === activeLandmark}
          aria-label={`${landmarkNames[landmark]} : ${title}`}
          data-cursor-label={landmarkNames[landmark]}
          style={{ left: `${LANDMARK_POSITIONS[landmark].xPercent}%`, top: `${LANDMARK_POSITIONS[landmark].yPercent}%` }}
          className={cn(
            'absolute z-2 grid size-[clamp(22px,3vw,36px)] -translate-1/2 cursor-pointer place-items-center rounded-full border-2 border-white font-mono text-[clamp(10px,1vw,14px)] font-medium text-white shadow-object transition-transform duration-200 ease-spring hover:scale-110 sm:border-[3px]',
            landmark === activeLandmark ? 'scale-115 bg-trail' : 'bg-trail/80',
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

function BinocularRing() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[var(--view-y)] left-[var(--view-x)] flex h-[calc(var(--lens)*2)] w-[calc(var(--lens)*3.64)] -translate-1/2 justify-between"
    >
      <span className="size-[calc(var(--lens)*2)] rounded-full border-[3px] border-ink/70 ring-2 ring-white/40" />
      <span className="size-[calc(var(--lens)*2)] rounded-full border-[3px] border-ink/70 ring-2 ring-white/40" />
    </div>
  )
}
