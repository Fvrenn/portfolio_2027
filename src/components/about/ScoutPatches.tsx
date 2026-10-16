import { useRef } from 'react'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { AboutContent } from '@/content/about'
import { ABOUT_IMAGES } from '@/content/aboutImages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useStitchedPatches } from '@/hooks/useStitchedPatches'
import { PATCH_SPOTS, PATCH_WIDTH_PERCENT, SCARF_SIZE } from './aboutLayout'

export function ScoutPatches({ content }: { content: AboutContent['patches'] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const scarfRef = useRef<HTMLDivElement>(null)
  useStitchedPatches(scarfRef)
  useRevealOnScroll(sectionRef)

  return (
    <section ref={sectionRef} className="bg-cream px-6 py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1240px]">
        <EyebrowHeading eyebrow={content.eyebrow} title={content.title} />
        <p className="mt-3 max-w-[60ch] text-ink/70">{content.intro}</p>
        <div ref={scarfRef} className="relative mx-auto mt-[clamp(24px,4vw,40px)] aspect-[1200/523] w-full max-w-[880px]">
          <img
            src={ABOUT_IMAGES.scarf}
            alt=""
            aria-hidden="true"
            width={SCARF_SIZE.width}
            height={SCARF_SIZE.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full"
          />
          {content.items.map(({ patch, image }, i) => (
            <img
              key={patch}
              src={image}
              alt=""
              aria-hidden="true"
              data-patch
              loading="lazy"
              decoding="async"
              style={{ left: `${PATCH_SPOTS[i].xPercent}%`, top: `${PATCH_SPOTS[i].yPercent}%`, width: `${PATCH_WIDTH_PERCENT}%` }}
              className="absolute h-auto -translate-1/2 drop-shadow-md"
            />
          ))}
        </div>
        <ul className="mt-[clamp(32px,5vw,56px)] grid gap-x-8 gap-y-6 border-t-[3px] border-dashed border-trail pt-[clamp(24px,3vw,32px)] sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map(({ patch, image, skill, proof }) => (
            <li key={patch} data-reveal className="flex gap-4">
              <img src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="size-14 shrink-0 object-contain" />
              <div>
                <h3 className="font-serif text-[22px] leading-tight">{skill}</h3>
                <p className="mt-1 text-[15px] text-ink/75">{proof}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
