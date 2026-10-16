import { useRef, type CSSProperties } from 'react'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { HalteLabels } from '@/content/halte'
import type { GalleryShot } from '@/content/projectDetails'
import { useGalleryScroll } from '@/hooks/useGalleryScroll'
import { GalleryShotFrame } from './GalleryShotFrame'

interface HalteGalleryProps {
  gallery: GalleryShot[]
  url: string
  labels: HalteLabels['gallery']
}

const SCROLL_VH_PER_SHOT = 45

export function HalteGallery({ gallery, url, labels }: HalteGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLUListElement>(null)
  useGalleryScroll({ trackRef, rowRef })

  return (
    <section className="relative bg-cream">
      <div
        ref={trackRef}
        style={{ '--gallery-scroll': `${gallery.length * SCROLL_VH_PER_SHOT}vh` } as CSSProperties}
        className="relative lg:motion-safe:h-[calc(100vh+var(--gallery-scroll))]"
      >
        <div className="flex flex-col justify-center gap-[clamp(20px,3vw,32px)] py-[clamp(48px,8vw,96px)] lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-screen lg:motion-safe:overflow-hidden lg:motion-safe:py-0 [--shot-h:min(58vh,520px)]">
          <EyebrowHeading
            eyebrow={labels.eyebrow}
            title={labels.title}
            className="mx-auto w-full max-w-[1240px] px-6"
          />
          <ul
            ref={rowRef}
            data-lenis-prevent-horizontal
            className="flex snap-x snap-mandatory items-end gap-[clamp(20px,3vw,48px)] overflow-x-auto px-6 pb-4 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:motion-safe:snap-none lg:motion-safe:overflow-visible"
          >
            {gallery.map((shot, i) => (
              <li key={`${shot.src}-${i}`} data-gallery-shot className="shrink-0 snap-center">
                <figure>
                  <GalleryShotFrame shot={shot} url={url} placeholder={labels.screenshotPlaceholder} />
                  <figcaption className="mt-3 flex max-w-[min(86vw,640px)] items-baseline gap-2">
                    <span className="shrink-0 font-mono text-[11px] tracking-[1.4px] whitespace-nowrap text-trail-dark uppercase">
                      {labels.shotLabel} {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-hand text-[clamp(18px,0.8vw+14px,24px)] leading-tight text-ink/75">{shot.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
