import { HALTE_MIST_BANDS } from '@/components/scene/scenes'
import type { HalteLabels } from '@/content/halte'
import { ProblemCard } from './ProblemCard'

interface ProblemPanelProps {
  problem: string[]
  labels: HalteLabels['mist']
}

export function ProblemPanel({ problem, labels }: ProblemPanelProps) {
  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-[clamp(40px,8vw,80px)]">
      <img
        src={HALTE_MIST_BANDS[2]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -top-4 left-1/2 h-auto w-[140%] max-w-none -translate-x-1/2 opacity-70"
      />
      <ProblemCard problem={problem} labels={labels} className="relative mx-auto max-w-[760px]" />
    </section>
  )
}
