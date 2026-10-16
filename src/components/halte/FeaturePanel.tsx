import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { Screenshot } from '@/components/ui/Screenshot'
import type { LandmarkId, ProjectFeature } from '@/content/projectDetails'
import { cn } from '@/lib/cn'

interface FeaturePanelProps {
  features: ProjectFeature[]
  activeLandmark: LandmarkId
  landmarkNames: Record<LandmarkId, string>
  url: string
  screenshotPlaceholder: string
  onSelect: (landmark: LandmarkId) => void
}

export function FeaturePanel({ features, activeLandmark, landmarkNames, url, screenshotPlaceholder, onSelect }: FeaturePanelProps) {
  const activeFeature = features.find(({ landmark }) => landmark === activeLandmark) ?? features[0]

  return (
    <div className="mt-[clamp(24px,4vw,40px)] grid items-start gap-[clamp(20px,3vw,40px)] lg:grid-cols-[0.9fr_1.1fr]">
      <ol className="grid gap-2">
        {features.map(({ landmark, title }, i) => (
          <li key={landmark}>
            <button
              type="button"
              onClick={() => onSelect(landmark)}
              aria-pressed={landmark === activeLandmark}
              className={cn(
                'flex w-full cursor-pointer items-center gap-4 border-l-[3px] py-2.5 pl-4 text-left transition-colors',
                landmark === activeLandmark ? 'border-trail' : 'border-transparent hover:border-trail/40',
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-trail font-mono text-sm text-white">{i + 1}</span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] tracking-[1.4px] text-ink/50 uppercase">{landmarkNames[landmark]}</span>
                <span className="block truncate font-medium">{title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <article key={activeFeature.landmark} className="motion-safe:animate-tag-swap">
        <BrowserFrame url={url}>
          <Screenshot src={activeFeature.screenshot.src} alt={activeFeature.screenshot.alt} placeholder={screenshotPlaceholder} />
        </BrowserFrame>
        <p className="mt-5 font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">{landmarkNames[activeFeature.landmark]}</p>
        <h3 className="mt-1 font-serif text-[clamp(24px,1.4vw+16px,34px)] leading-tight">{activeFeature.title}</h3>
        <p className="mt-2 text-ink/75">{activeFeature.text}</p>
      </article>
    </div>
  )
}
