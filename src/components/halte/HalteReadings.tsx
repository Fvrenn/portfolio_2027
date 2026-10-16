import { useRef } from 'react'
import { DeviceScreen } from '@/components/ui/DeviceScreen'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { HalteLabels } from '@/content/halte'
import type { ProjectReading } from '@/content/projectDetails'
import { useCountUp } from '@/hooks/useCountUp'
import { useLocale } from '@/hooks/useLocale'

interface HalteReadingsProps {
  readings: ProjectReading[]
  projectTitle: string
  labels: HalteLabels['readings']
}

export function HalteReadings({ readings, projectTitle, labels }: HalteReadingsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { locale } = useLocale()
  useCountUp(sectionRef, locale)

  return (
    <section ref={sectionRef} className="bg-cream px-6 py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1240px]">
        <EyebrowHeading eyebrow={labels.eyebrow} title={labels.title} />
        <DeviceScreen
          label={`${labels.eyebrow} · ${projectTitle}`}
          readings={readings}
          className="mt-[clamp(24px,4vw,40px)] max-w-[900px]"
        />
      </div>
    </section>
  )
}
