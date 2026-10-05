import { cn } from '@/lib/cn'

interface Education {
  period: string
  title: string
  school: string
  span: number
}

const WIDE_SPAN_CLASSES: Record<number, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
}

interface EducationBandProps {
  label: string
  education: Education[]
}

export function EducationBand({ label, education }: EducationBandProps) {
  return (
    <div data-reveal className="mt-4">
      <p className="font-mono text-[11px] tracking-[1.4px] text-ink/50 uppercase">{label}</p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {education.map(({ period, title, school, span }) => (
          <li key={title} className={cn('rounded-2xl border border-dashed border-topo/60 px-5 py-3', WIDE_SPAN_CLASSES[span])}>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-ink/60">
              {school} · {period}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
