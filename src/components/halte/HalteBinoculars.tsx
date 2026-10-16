import { useState } from 'react'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { HalteLabels } from '@/content/halte'
import type { LandmarkId, ProjectFeature } from '@/content/projectDetails'
import { BinocularView } from './BinocularView'
import { FeaturePanel } from './FeaturePanel'

interface HalteBinocularsProps {
  features: ProjectFeature[]
  url: string
  labels: HalteLabels['binoculars']
}

export function HalteBinoculars({ features, url, labels }: HalteBinocularsProps) {
  const [activeLandmark, setActiveLandmark] = useState<LandmarkId>(features[0].landmark)

  return (
    <section className="bg-cream px-6 pb-[clamp(64px,10vw,120px)]">
      <div className="mx-auto max-w-[1240px]">
        <EyebrowHeading eyebrow={labels.eyebrow} title={labels.title} />
        <p className="mt-3 max-w-[60ch] text-ink/65">{labels.hint}</p>
        <div className="mt-[clamp(24px,4vw,40px)]">
          <BinocularView features={features} activeLandmark={activeLandmark} landmarkNames={labels.landmarks} onSelect={setActiveLandmark} />
        </div>
        <FeaturePanel
          features={features}
          activeLandmark={activeLandmark}
          landmarkNames={labels.landmarks}
          url={url}
          screenshotPlaceholder={labels.screenshotPlaceholder}
          onSelect={setActiveLandmark}
        />
      </div>
    </section>
  )
}
