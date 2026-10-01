interface MapPlace {
  name: string
  xPercent: number
  yPercent: number
}

interface MapDetailsProps {
  places: MapPlace[]
  scaleLabel: string
  northLabel: string
}

export function MapDetails({ places, scaleLabel, northLabel }: MapDetailsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 max-sm:hidden" aria-hidden="true">
      {places.map(({ name, xPercent, yPercent }) => (
        <span
          key={name}
          style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
          className="absolute font-serif text-sm tracking-[2px] text-topo-index/80 italic"
        >
          {name}
        </span>
      ))}
      <NorthArrow label={northLabel} />
      <ScaleBar label={scaleLabel} />
    </div>
  )
}

function NorthArrow({ label }: { label: string }) {
  return (
    <div className="absolute top-36 right-[12%] flex flex-col items-center gap-1 text-topo-index">
      <span className="font-mono text-xs font-medium">{label}</span>
      <svg viewBox="0 0 20 32" className="h-8 w-5" aria-hidden="true">
        <path d="M10 0 18 30 10 24 2 30Z" className="fill-topo-index" />
        <path d="M10 0 10 24 2 30Z" className="fill-cream" />
        <path d="M10 0 18 30 10 24 2 30Z" fill="none" strokeWidth={1} className="stroke-topo-index" />
      </svg>
    </div>
  )
}

function ScaleBar({ label }: { label: string }) {
  return (
    <div className="absolute bottom-16 left-10 flex flex-col gap-1 font-mono text-[11px] text-topo-index">
      <div className="flex h-1.5 w-32 border border-topo-index">
        <span className="w-1/4 bg-topo-index" />
        <span className="w-1/4" />
        <span className="w-1/4 bg-topo-index" />
        <span className="w-1/4" />
      </div>
      <div className="flex w-32 justify-between">
        <span>0</span>
        <span>{label}</span>
      </div>
    </div>
  )
}
