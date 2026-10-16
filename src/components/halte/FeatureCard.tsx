import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { Screenshot } from '@/components/ui/Screenshot'
import { TopoSheet } from '@/components/ui/TopoSheet'
import type { HalteLabels } from '@/content/halte'
import type { ProjectFeature } from '@/content/projectDetails'
import { cn } from '@/lib/cn'

interface FeatureCardProps {
  features: ProjectFeature[]
  activeIndex: number
  url: string
  labels: HalteLabels['binoculars']
  onSelect: (index: number) => void
}

export function FeatureCard({ features, activeIndex, url, labels, onSelect }: FeatureCardProps) {
  const feature = features[activeIndex]

  return (
    <TopoSheet label={`${labels.eyebrow} · ${labels.title}`} reference={`${activeIndex + 1} / ${features.length}`}>
      <div key={feature.landmark} className="mt-3 motion-safe:animate-tag-swap">
        <BrowserFrame url={url}>
          <Screenshot src={feature.screenshot.src} alt={feature.screenshot.alt} placeholder={labels.screenshotPlaceholder} />
        </BrowserFrame>
        <p className="mt-4 font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">
          {activeIndex + 1} · {labels.landmarks[feature.landmark]}
        </p>
        <h3 className="mt-1 font-serif text-[clamp(22px,1vw+14px,30px)] leading-tight">{feature.title}</h3>
        <p className="mt-1.5 text-[15px] text-ink/75">{feature.text}</p>
      </div>
      <div className="mt-4 flex gap-1.5">
        {features.map(({ landmark }, i) => (
          <button
            key={landmark}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={i === activeIndex}
            aria-label={labels.landmarks[landmark]}
            className={cn('h-1.5 flex-1 cursor-pointer transition-colors', i === activeIndex ? 'bg-trail' : 'bg-ink/15 hover:bg-ink/30')}
          />
        ))}
      </div>
      <p className="mt-3 text-[13px] text-ink/55">{labels.hint}</p>
    </TopoSheet>
  )
}
