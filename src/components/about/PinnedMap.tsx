import { useRef } from 'react'
import { SiteLink } from '@/components/navigation/SiteLink'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { NotebookPage } from '@/components/ui/NotebookPage'
import type { AboutContent } from '@/content/about'
import { ABOUT_IMAGES } from '@/content/aboutImages'
import { useMapString } from '@/hooks/useMapString'
import { buildSaggingSegment } from '@/lib/rope'
import { MAP_BOARD_SIZE, MAP_PINS, MAP_STRING_SAG } from './aboutLayout'

const PERCENT = 100
const segments = MAP_PINS.slice(1).map((pin, i) => buildSaggingSegment(MAP_PINS[i], pin, MAP_STRING_SAG))

export function PinnedMap({ content }: { content: AboutContent['map'] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  useMapString({ sectionRef, stepsRef })
  const lastIndex = content.steps.length - 1

  return (
    <section ref={sectionRef} className="bg-cream px-6 py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1240px]">
        <EyebrowHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-[clamp(24px,4vw,40px)] grid items-start gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative aspect-[1400/978] w-full lg:sticky lg:top-[16vh]">
            <img
              src={ABOUT_IMAGES.mapBoard}
              alt=""
              aria-hidden="true"
              width={MAP_BOARD_SIZE.width}
              height={MAP_BOARD_SIZE.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full"
            />
            <svg viewBox={`0 0 ${MAP_BOARD_SIZE.width} ${MAP_BOARD_SIZE.height}`} className="absolute inset-0 size-full" aria-hidden="true">
              {segments.map((segment) => (
                <path
                  key={segment}
                  d={segment}
                  data-map-segment
                  fill="none"
                  strokeWidth={7}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  className="stroke-alert drop-shadow-sm"
                />
              ))}
            </svg>
            {MAP_PINS.map(([x, y], i) => (
              <span
                key={i}
                data-map-pin
                aria-hidden="true"
                style={{ left: `${(x / MAP_BOARD_SIZE.width) * PERCENT}%`, top: `${(y / MAP_BOARD_SIZE.height) * PERCENT}%` }}
                className="absolute grid size-[clamp(24px,2.6vw,36px)] -translate-1/2 place-items-center rounded-full border-[3px] border-white bg-trail font-mono text-[clamp(11px,1vw,14px)] text-white shadow-object"
              >
                {i + 1}
              </span>
            ))}
          </div>
          <ol ref={stepsRef} className="grid gap-4 lg:gap-0">
            {content.steps.map(({ period, title, text }, i) => (
              <li key={title} data-map-step className="odd:-rotate-1 even:rotate-1 lg:flex lg:min-h-[46vh] lg:items-center">
                <NotebookPage className="w-full">
                  <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">
                    {i + 1} · {period}
                  </p>
                  <h3 className="font-hand text-[clamp(26px,1vw+20px,32px)] leading-[28px] font-bold">{title}</h3>
                  <p className="mt-[28px] text-ink/80">{text}</p>
                  {i === lastIndex && (
                    <SiteLink href={content.journeyHref} className="mt-[28px] inline-block font-medium underline decoration-trail decoration-2 underline-offset-4">
                      {content.journeyLabel} →
                    </SiteLink>
                  )}
                </NotebookPage>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
