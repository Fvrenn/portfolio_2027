import { useRef } from 'react'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
import { SummitRidge } from '@/components/summit/SummitRidge'
import { contactContent } from '@/content/contact'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { cn } from '@/lib/cn'

export function Summit() {
  const sectionRef = useRef<HTMLElement>(null)
  useRevealOnScroll(sectionRef)

  const { eyebrow, title, seeking, links, footer } = useLocalized(contactContent)
  const availableLinks = links.filter(({ href }) => href)

  return (
    <section ref={sectionRef} id={SECTION_IDS.contact} className="bg-dusk relative z-2 overflow-x-clip px-6 pt-48 text-cream-text">
      <RidgeEdge variant="summit" frontClassName="fill-dusk-high" backClassName="fill-dusk-mid/45" />
      <div data-reveal className="relative z-1 mx-auto max-w-[900px] text-center">
        <p className="font-mono text-xs tracking-[1.4px] text-cream-text/75 uppercase">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-[clamp(44px,6.5vw,92px)] leading-[1.02]">{title}</h2>
        <p className="mx-auto mt-6 max-w-[620px] text-lg text-cream-text/85">{seeking}</p>
        {availableLinks.length > 0 && (
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {availableLinks.map(({ label, href, isPrimary }) => (
              <li key={label}>
                <a
                  href={href}
                  className={cn(
                    'inline-block rounded-full px-6 py-3 font-medium transition-transform duration-200 ease-spring hover:scale-105',
                    isPrimary ? 'bg-gold text-ink' : 'border border-cream-text/40 text-cream-text',
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SummitRidge />
      <footer className="relative z-1 -mx-6 flex flex-wrap justify-between gap-2 bg-dusk-ridge px-6 py-6 font-mono text-xs text-cream-text/70">
        <span>{footer.signature}</span>
        <span>{footer.madeWith}</span>
      </footer>
    </section>
  )
}
