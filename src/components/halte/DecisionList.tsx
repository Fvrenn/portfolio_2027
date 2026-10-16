import { NotebookPage } from '@/components/ui/NotebookPage'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDecision } from '@/content/projectDetails'
import { cn } from '@/lib/cn'

interface DecisionListProps {
  decisions: ProjectDecision[]
  labels: HalteLabels['notebook']
  className?: string
}

const fieldLabel = 'font-mono text-[10px] tracking-[1.4px] text-ink/50 uppercase'

export function DecisionList({ decisions, labels, className }: DecisionListProps) {
  return (
    <ol className={cn('grid gap-8', className)}>
      {decisions.map(({ choice, alternative, reason }, i) => (
        <li key={choice} data-reveal className="odd:-rotate-1 even:rotate-1">
          <NotebookPage>
            <p className="font-mono text-xs text-trail-dark">
              {i + 1} / {decisions.length}
            </p>
            <p className={fieldLabel}>{labels.choiceLabel}</p>
            <p className="font-hand text-[clamp(24px,2vw+16px,32px)] leading-[28px] font-bold">{choice}</p>
            <p className={fieldLabel}>{labels.alternativeLabel}</p>
            <p className="font-hand text-[clamp(20px,1.4vw+14px,26px)] leading-[28px] text-ink/65">{alternative}</p>
            <p className={fieldLabel}>{labels.reasonLabel}</p>
            <p className="text-ink/80">{reason}</p>
          </NotebookPage>
        </li>
      ))}
    </ol>
  )
}
