import { useRef } from 'react'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
import { PaintedScene } from '@/components/scene/PaintedScene'
import { SUMMIT_HIKER_SCENE, SUMMIT_SKY_SCENE } from '@/components/scene/scenes'
import { contactContent } from '@/content/contact'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useSceneParallax } from '@/hooks/useSceneParallax'
import { cn } from '@/lib/cn'

export function Summit() {
  const sectionRef = useRef<HTMLElement>(null)
  useRevealOnScroll(sectionRef)
  useSceneParallax(sectionRef)

  const { eyebrow, title, seeking, links, footer } = useLocalized(contactContent)
  const availableLinks = links.filter(({ href }) => href)

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.contact}
      className="relative z-2 flex flex-col bg-dawn-high text-cream-text lg:min-h-screen"
    >
      <RidgeEdge variant="summit" frontClassName="fill-dawn-high" backClassName="fill-dusk-mid/40" />
      <div className="relative z-1 px-6 pt-[clamp(112px,12vw,160px)] lg:px-[max(24px,calc((100vw-1240px)/2))] lg:pb-[clamp(240px,34vw,460px)]">
        <div data-reveal className="mx-auto max-w-[900px] text-center text-shadow-lg/30 lg:mx-0 lg:max-w-[600px] lg:text-left">
          <p className="font-mono text-xs tracking-[1.4px] text-cream-text/80 uppercase">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.2vw+20px,84px)] leading-[1.02]">{title}</h2>
          <p className="mx-auto mt-6 max-w-[620px] text-lg text-cream-text/90 lg:mx-0">{seeking}</p>
          {availableLinks.length > 0 && (
            <ul className="mt-10 flex flex-wrap justify-center gap-3 text-shadow-none lg:justify-start">
              {availableLinks.map(({ label, href, isPrimary }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={cn(
                      'inline-block rounded-full px-6 py-3 font-medium transition-transform duration-200 ease-spring hover:scale-105',
                      isPrimary ? 'bg-gold text-ink' : 'border border-cream-text/50 bg-dawn-high/40 text-cream-text backdrop-blur-sm',
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="pointer-events-none relative -mt-[clamp(24px,8vw,80px)] aspect-[4/5] w-full sm:aspect-[4/3] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto">
        <PaintedScene layers={SUMMIT_SKY_SCENE} imageClassName="object-[85%_bottom]" />
        <div className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-dawn-high to-transparent" />
        <PaintedScene layers={SUMMIT_HIKER_SCENE} imageClassName="object-[85%_bottom]" />
      </div>
      <footer className="relative z-1 mt-auto flex flex-wrap justify-between gap-2 bg-dawn-low/60 px-6 py-6 font-mono text-xs text-cream-text/80 backdrop-blur-sm">
        <span>{footer.signature}</span>
        <span>{footer.madeWith}</span>
      </footer>
    </section>
  )
}
