import type { CSSProperties } from 'react'

interface StepScenery {
  src: string
  width: number
  height: number
  scale: number
}

interface JourneyStep {
  period: string
  kind: string
  product: string
  text: string
  scenery: StepScenery
}

export function JourneySteps({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol
      style={{ '--step-count': steps.length } as CSSProperties}
      className="grid gap-x-[var(--climb-gap)] gap-y-4 [--climb-gap:clamp(16px,2.6vw,40px)] [--climb-rise:clamp(32px,3.4vw,52px)] sm:grid-cols-2 xl:grid-cols-5 xl:pt-[calc((var(--step-count)-1)*var(--climb-rise))]"
    >
      {steps.map((step, i) => (
        <li
          key={step.period}
          data-journey-step
          style={{ '--step-index': i } as CSSProperties}
          className="relative mt-[clamp(64px,7vw,104px)] xl:-translate-y-[calc(var(--step-index)*var(--climb-rise))]"
        >
          {i > 0 && <StepConnector />}
          <StepCard step={step} number={i + 1} />
        </li>
      ))}
    </ol>
  )
}

function StepConnector() {
  return (
    <svg
      data-step-connector
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute right-full top-0 hidden h-[var(--climb-rise)] w-[var(--climb-gap)] overflow-visible xl:block"
      aria-hidden="true"
    >
      <path d="M0 100 L100 0" fill="none" strokeWidth={3} strokeDasharray="6 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="stroke-trail" />
    </svg>
  )
}

function StepCard({ step, number }: { step: JourneyStep; number: number }) {
  const { period, kind, product, text, scenery } = step

  return (
    <div className="relative h-full rounded-2xl bg-white p-5 pt-6 shadow-object">
      <img
        src={scenery.src}
        alt=""
        aria-hidden="true"
        width={scenery.width}
        height={scenery.height}
        loading="lazy"
        decoding="async"
        data-step-scenery
        style={{ '--scenery-scale': scenery.scale } as CSSProperties}
        className="absolute bottom-[calc(100%-10px)] left-1/2 h-[calc(var(--scenery-scale)*clamp(56px,6vw,84px))] w-auto max-w-[90%] -translate-x-1/2 object-contain object-bottom"
      />
      <span
        data-step-marker
        className="absolute -top-4 -left-4 grid size-9 place-items-center rounded-full border-[3px] border-white bg-trail font-mono text-sm font-medium text-white shadow-object"
        aria-hidden="true"
      >
        {number}
      </span>
      <p className="font-mono text-[11px] tracking-[1.4px] text-trail-dark uppercase">{period}</p>
      <h3 className="mt-1 font-serif text-2xl leading-tight">{product}</h3>
      <p className="mt-0.5 font-mono text-[11px] text-ink/50">{kind}</p>
      <p className="mt-3 text-[15px] text-ink/75">{text}</p>
    </div>
  )
}
