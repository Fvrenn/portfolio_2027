import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { NotebookPage } from '@/components/ui/NotebookPage'
import type { HalteLabels } from '@/content/halte'

interface ProblemCardProps {
  problem: string[]
  labels: HalteLabels['mist']
  className?: string
}

export function ProblemCard({ problem, labels, className }: ProblemCardProps) {
  return (
    <NotebookPage className={className}>
      <EyebrowHeading eyebrow={labels.eyebrow} title={labels.title} />
      {problem.map((paragraph) => (
        <p key={paragraph} className="mt-[28px] text-[clamp(16px,0.4vw+15px,18px)] text-ink/80">
          {paragraph}
        </p>
      ))}
    </NotebookPage>
  )
}
