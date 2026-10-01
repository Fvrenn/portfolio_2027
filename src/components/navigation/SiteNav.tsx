import { navigationContent } from '@/content/navigation'
import { SECTION_IDS, toAnchor } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { LocaleToggle } from './LocaleToggle'

export function SiteNav() {
  const { name, initial, homeLabel, languageLabel, links, cta } = useLocalized(navigationContent)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-60 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/40 bg-cream/75 p-1.5 shadow-object backdrop-blur-md">
        <a href={toAnchor(SECTION_IDS.top)} aria-label={homeLabel} className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1">
          <span className="grid size-8 place-items-center rounded-full bg-trail font-serif text-lg text-white">
            {initial}
          </span>
          <span className="font-mono text-xs tracking-[1.2px] uppercase max-sm:hidden">{name}</span>
        </a>
        <ul className="flex items-center max-md:hidden">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-ink/5">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={cta.href}
          className="rounded-full bg-ink px-4 py-2 text-sm text-cream-text transition-transform duration-200 ease-spring hover:scale-105"
        >
          {cta.label}
        </a>
        <LocaleToggle label={languageLabel} />
      </nav>
    </header>
  )
}
