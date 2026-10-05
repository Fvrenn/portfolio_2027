import { logbookContent } from '@/content/logbook'
import { useLocalized } from '@/hooks/useLocale'
import { NightPanel } from './NightPanel'

export function LogbookPanel() {
  const { title, intro, root, folders, proofsTitle, proofs, links } = useLocalized(logbookContent)

  return (
    <NightPanel title={title} intro={intro}>
      <div className="mt-6 rounded-2xl bg-night/70 p-5 font-mono text-sm">
        <p className="text-campfire">{root}</p>
        <ul>
          {folders.map(({ name, role }, i) => (
            <li key={name} data-reveal className="flex gap-3">
              <span className="shrink-0 text-cream-text/35" aria-hidden="true">
                {i === folders.length - 1 ? '└──' : '├──'}
              </span>
              <span className="w-28 shrink-0 text-cream-text">{name}</span>
              <span className="text-cream-text/55">{role}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-[1.4px] text-campfire uppercase">{proofsTitle}</p>
      <ul className="mt-2 space-y-1.5">
        {proofs.map((proof) => (
          <li key={proof} className="flex gap-2 text-cream-text/85">
            <span className="text-campfire" aria-hidden="true">✓</span>
            {proof}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-cream-text/40 px-5 py-2.5 text-sm transition-transform duration-200 ease-spring hover:scale-105"
          >
            {label} →
          </a>
        ))}
      </div>
    </NightPanel>
  )
}
