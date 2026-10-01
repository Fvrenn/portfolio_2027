import { useId, type Ref } from 'react'

export function Needle({ ref }: { ref: Ref<HTMLDivElement> }) {
  const brassGradientId = `${useId()}-brass`

  return (
    <div ref={ref} className="absolute inset-0 will-change-[rotate]" aria-hidden="true">
      <svg viewBox="-100 -100 200 200" className="size-full drop-shadow-md">
        <defs>
          <radialGradient id={brassGradientId} cx="40%" cy="35%">
            <stop offset="0%" className="[stop-color:var(--color-brass-highlight)]" />
            <stop offset="100%" className="[stop-color:var(--color-brass-dark)]" />
          </radialGradient>
        </defs>
        <polygon points="0,-78 6,0 -6,0" className="fill-alert" />
        <polygon points="0,-78 0,0 -6,0" className="fill-alert-shade" />
        <polygon points="0,78 6,0 -6,0" className="fill-needle-tail" />
        <polygon points="0,78 0,0 -6,0" className="fill-needle-tail-shade" />
        <circle r={9} fill={`url(#${brassGradientId})`} strokeWidth={1} className="stroke-brass-deep" />
        <circle r={2.5} className="fill-brass-deep" />
      </svg>
    </div>
  )
}
