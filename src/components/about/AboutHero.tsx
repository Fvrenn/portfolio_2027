import { useRef } from 'react'
import { SceneImage } from '@/components/scene/SceneImage'
import type { AboutContent } from '@/content/about'
import { ABOUT_IMAGES } from '@/content/aboutImages'
import { useSceneParallax } from '@/hooks/useSceneParallax'
import { CAMPER_SIZE, CAMPER_SPOT } from './aboutLayout'

export function AboutHero({ content }: { content: AboutContent['hero'] }) {
  const sectionRef = useRef<HTMLElement>(null)
  useSceneParallax(sectionRef)

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-cream lg:h-svh lg:min-h-[640px]">
      <div className="relative aspect-[3/2] w-full lg:cover-canvas lg:[--focus-x:0.3] lg:[--focus-y:0.78]">
        <div data-scene-depth="0.3" className="absolute inset-x-0 -inset-y-4">
          <SceneImage path={ABOUT_IMAGES.camp} />
        </div>
        <img
          src={ABOUT_IMAGES.camper}
          alt={content.imageAlt}
          width={CAMPER_SIZE.width}
          height={CAMPER_SIZE.height}
          decoding="async"
          data-scene-depth="0.7"
          style={{ left: `${CAMPER_SPOT.leftPercent}%`, bottom: `${CAMPER_SPOT.bottomPercent}%`, width: `${CAMPER_SPOT.widthPercent}%` }}
          className="absolute h-auto"
        />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-linear-to-r from-night-sky/55 via-night-sky/25 to-transparent max-lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-linear-to-b from-transparent to-cream max-lg:hidden" />
      <div className="relative px-6 pt-8 pb-[clamp(32px,6vw,56px)] lg:absolute lg:top-[clamp(110px,16vh,170px)] lg:left-[max(24px,calc((100vw-1240px)/2))] lg:w-[min(560px,40vw)] lg:p-0 lg:text-cream-text lg:text-shadow-lg/35">
        <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-trail-dark uppercase lg:text-gold">
          <span className="size-2 rounded-full bg-trail lg:bg-gold" />
          {content.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-[clamp(30px,1.8vw+20px,52px)] leading-[1.08] text-balance">{content.title}</h1>
        {content.bio.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-[52ch] text-ink/75 lg:text-cream-text/90">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
