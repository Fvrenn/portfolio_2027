import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Signpost } from '@/components/ui/Signpost'
import { TrailSign } from '@/components/ui/TrailSign'
import type { AboutContent } from '@/content/about'

export function AboutDeparture({ content }: { content: AboutContent['departure'] }) {
  return (
    <section className="bg-linear-to-b from-cream via-golden-hour to-golden-low px-6 pt-[clamp(56px,8vw,96px)] pb-[clamp(56px,8vw,96px)]">
      <div className="mx-auto grid max-w-[1100px] items-end gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <EyebrowHeading eyebrow={content.eyebrow} title={content.title} />
          <p className="mt-4 max-w-[60ch] text-ink/75">{content.text}</p>
        </div>
        <Signpost className="w-full max-w-[420px]">
          <TrailSign href={content.contactHref} title={content.contactLabel} />
          <TrailSign href={content.projectsHref} title={content.projectsLabel} className="w-[86%]" />
        </Signpost>
      </div>
    </section>
  )
}
