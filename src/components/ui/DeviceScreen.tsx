import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/cn'
import { toCountLabel } from '@/lib/format'

interface DeviceReading {
  value: number
  unit: string
  label: string
}

interface DeviceScreenProps {
  label: string
  readings: DeviceReading[]
  className?: string
}

export function DeviceScreen({ label, readings, className }: DeviceScreenProps) {
  const { locale } = useLocale()

  return (
    <div className={cn('grid gap-3 rounded-[22px] border border-deck-border bg-deck p-4 shadow-device', className)}>
      <p className="flex items-center justify-between px-1.5 font-mono text-[10px] tracking-[1.4px] text-ink/60 uppercase">
        <span>{label}</span>
        <span className="size-2 rounded-full bg-trail shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-trail)_25%,transparent)]" aria-hidden="true" />
      </p>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] overflow-hidden rounded-[10px] bg-lcd text-lcd-ink shadow-screen">
        {readings.map(({ value, unit, label: readingLabel }) => (
          <div key={readingLabel} className="flex flex-col-reverse border-lcd-ink/20 px-3 pt-3 pb-2.5 not-first:border-l">
            <dt className="mt-1.5 font-mono text-[10px] tracking-[0.6px] uppercase opacity-75">{readingLabel}</dt>
            <dd className="font-mono text-[clamp(24px,1.6vw+14px,36px)] leading-none font-medium tracking-tight tabular-nums">
              <span data-count-to={value}>{toCountLabel(value, locale)}</span>
              {unit && <span className="ml-1 text-[0.45em]">{unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
