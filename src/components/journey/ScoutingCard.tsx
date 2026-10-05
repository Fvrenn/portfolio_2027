interface ScoutingCardProps {
  eyebrow: string
  title: string
  facts: string[]
  takeaway: string
  linkLabel: string
  href: string
}

export function ScoutingCard({ eyebrow, title, facts, takeaway, linkLabel, href }: ScoutingCardProps) {
  return (
    <article data-reveal className="mt-[clamp(40px,6vw,64px)] grid gap-6 rounded-3xl bg-white/70 p-[clamp(20px,3vw,32px)] shadow-object backdrop-blur-sm lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">{eyebrow}</p>
        <h3 className="mt-1.5 font-serif text-[clamp(28px,3vw,38px)] leading-tight">{title}</h3>
        <p className="mt-3 text-ink/70">{takeaway}</p>
      </div>
      <div>
        <ul className="space-y-2.5">
          {facts.map((fact) => (
            <li key={fact} className="flex gap-3 text-ink/80">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-trail" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        <a href={href} className="mt-5 inline-block font-medium underline decoration-trail decoration-2 underline-offset-4">
          {linkLabel} →
        </a>
      </div>
    </article>
  )
}
