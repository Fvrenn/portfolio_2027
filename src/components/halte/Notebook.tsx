import { HALTE_NOTEBOOK_PATH, SCENE_FALLBACK_WIDTH, SCENE_WIDTHS } from '@/components/scene/scenes'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDecision } from '@/content/projectDetails'
import { cn } from '@/lib/cn'
import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'
import { NOTEBOOK_SIZE } from './landmarks'

interface NotebookProps {
  decisions: ProjectDecision[]
  labels: HalteLabels['notebook']
  className?: string
}

const pageLabel = 'font-mono text-[clamp(9px,0.5vw+5px,12px)] tracking-[1.4px] text-ink/50 uppercase'

export function Notebook({ decisions, labels, className }: NotebookProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative mx-auto aspect-[1536/872] w-full max-w-[min(1100px,calc(68vh*1.76))]', className)}
    >
      <img
        src={toSizedSrc(HALTE_NOTEBOOK_PATH, SCENE_FALLBACK_WIDTH)}
        srcSet={toSrcSet(HALTE_NOTEBOOK_PATH, SCENE_WIDTHS)}
        sizes="(min-width: 1024px) 1100px, 100vw"
        alt=""
        width={NOTEBOOK_SIZE.width}
        height={NOTEBOOK_SIZE.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full"
      />
      {decisions.map(({ choice, alternative, reason }, i) => (
        <div key={choice} data-notebook-page className="absolute inset-0">
          <div className="absolute top-[12%] left-[9%] w-[31%]">
            <p className={pageLabel}>{labels.choiceLabel}</p>
            <p className="mt-1 font-hand text-[clamp(20px,2.3vw,38px)] leading-[1.1] font-bold">{choice}</p>
            <p className={cn(pageLabel, 'mt-[6%]')}>{labels.alternativeLabel}</p>
            <p className="mt-1 font-hand text-[clamp(17px,1.7vw,28px)] leading-[1.15] text-ink/65">{alternative}</p>
          </div>
          <div className="absolute top-[12%] left-[49%] w-[27%]">
            <p className={pageLabel}>{labels.reasonLabel}</p>
            <p className="mt-2 text-[clamp(12px,1vw+3px,17px)] leading-snug text-ink/80">{reason}</p>
          </div>
          <p data-notebook-counter className={cn(pageLabel, 'absolute bottom-[13%] left-[9%]')}>
            {i + 1} / {decisions.length}
          </p>
        </div>
      ))}
    </div>
  )
}
