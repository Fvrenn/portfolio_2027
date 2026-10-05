interface JourneyStep {
  period: string
  kind: string
  product: string
  text: string
}

export function JourneySteps({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map(({ period, kind, product, text }, i) => (
        <li key={period} data-reveal className="rounded-2xl bg-white p-5 shadow-object">
          <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">
            <span className="lg:hidden">{i + 1} · </span>
            {period}
          </p>
          <h3 className="mt-1 font-serif text-2xl leading-tight">{product}</h3>
          <p className="mt-0.5 font-mono text-[11px] text-ink/50">{kind}</p>
          <p className="mt-3 text-[15px] text-ink/75">{text}</p>
        </li>
      ))}
    </ol>
  )
}
