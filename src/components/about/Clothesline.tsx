import { useRef, type CSSProperties } from 'react'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { AboutContent } from '@/content/about'
import { useHangingPolaroids } from '@/hooks/useHangingPolaroids'
import { getQuadraticY } from '@/lib/rope'
import { ROPE } from './aboutLayout'
import { Polaroid } from './Polaroid'

const SWAY_DELAY_STEP_S = 0.8
const PERCENT = 100

export function Clothesline({ content }: { content: AboutContent['clothesline'] }) {
  const lineRef = useRef<HTMLUListElement>(null)
  useHangingPolaroids(lineRef)
  const { photos } = content

  return (
    <section className="bg-cream px-6 pb-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1240px]">
        <EyebrowHeading eyebrow={content.eyebrow} title={content.title} />
        <ul
          ref={lineRef}
          className="relative mt-[clamp(24px,4vw,40px)] grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:block lg:h-[clamp(300px,24vw,380px)]"
        >
          <svg viewBox={`0 0 ${PERCENT} ${PERCENT}`} preserveAspectRatio="none" className="absolute inset-0 size-full max-lg:hidden" aria-hidden="true">
            <path
              d={`M0 ${ROPE.endY}Q${PERCENT / 2} ${ROPE.sagY} ${PERCENT} ${ROPE.endY}`}
              fill="none"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="stroke-ink/40"
            />
          </svg>
          {photos.map((photo, i) => {
            const t = (i + 0.5) / photos.length
            const ropeStyle = {
              '--rope-x': `${t * PERCENT}%`,
              '--rope-y': `${getQuadraticY(ROPE.endY, ROPE.sagY, ROPE.endY, t)}%`,
            } as CSSProperties
            return (
              <li
                key={i}
                data-polaroid
                className="relative lg:absolute lg:top-(--rope-y) lg:left-(--rope-x) lg:w-[clamp(150px,13vw,190px)] lg:-translate-x-1/2"
                style={ropeStyle}
              >
                <div className="relative origin-top motion-safe:animate-polaroid-sway" style={{ animationDelay: `${-i * SWAY_DELAY_STEP_S}s` }}>
                  <span className="absolute -top-3 left-1/2 z-1 h-7 w-2.5 -translate-x-1/2 rounded-sm bg-clothespin shadow-sm max-lg:hidden" aria-hidden="true" />
                  <Polaroid photo={photo} placeholder={content.photoPlaceholder} className="transition-transform duration-300 hover:-translate-y-1 hover:rotate-1" />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
