import { useRef } from 'react'
import { SceneImage } from '@/components/scene/SceneImage'
import { HALTE_PANORAMA_PATH } from '@/components/scene/scenes'
import type { LandmarkId, ProjectFeature } from '@/content/projectDetails'
import { useBinocularView } from '@/hooks/useBinocularView'
import { BinocularLayers } from './BinocularLayers'
import { LANDMARK_POSITIONS } from './landmarks'

interface BinocularViewProps {
  features: ProjectFeature[]
  activeLandmark: LandmarkId
  landmarkNames: Record<LandmarkId, string>
  onSelect: (landmark: LandmarkId) => void
}

export function BinocularView({ features, activeLandmark, landmarkNames, onSelect }: BinocularViewProps) {
  const viewRef = useRef<HTMLDivElement>(null)
  useBinocularView(viewRef, LANDMARK_POSITIONS[activeLandmark])

  return (
    <div
      ref={viewRef}
      className="relative mx-auto aspect-[3/2] w-full max-w-[140vh] overflow-hidden rounded-3xl shadow-object [--lens:clamp(52px,7.5vw,118px)] [--view-x:50%] [--view-y:50%]"
    >
      <SceneImage path={HALTE_PANORAMA_PATH} />
      <BinocularLayers features={features} activeLandmark={activeLandmark} landmarkNames={landmarkNames} onSelect={onSelect} />
    </div>
  )
}
