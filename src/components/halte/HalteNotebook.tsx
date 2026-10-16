import { useRef, type CSSProperties } from 'react'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDecision } from '@/content/projectDetails'
import { useNotebookPages } from '@/hooks/useNotebookPages'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { DecisionList } from './DecisionList'
import { Notebook } from './Notebook'

interface HalteNotebookProps {
  decisions: ProjectDecision[]
  labels: HalteLabels['notebook']
}

const SCROLL_STEPS_AFTER_PAGES = 0.5

export function HalteNotebook({ decisions, labels }: HalteNotebookProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  useNotebookPages({ sectionRef, trackRef })
  useRevealOnScroll(sectionRef)

  return (
    <section ref={sectionRef} className="relative bg-cream">
      <div
        ref={trackRef}
        style={{ '--notebook-steps': decisions.length + SCROLL_STEPS_AFTER_PAGES } as CSSProperties}
        className="relative lg:motion-safe:h-[calc(var(--notebook-steps)*100vh)]"
      >
        <div className="px-6 py-[clamp(64px,10vw,112px)] lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-screen lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:py-16">
          <div className="mx-auto w-full max-w-[1240px]">
            <EyebrowHeading eyebrow={labels.eyebrow} title={labels.title} />
            <Notebook decisions={decisions} labels={labels} className="mt-8 hidden lg:motion-safe:block" />
            <DecisionList decisions={decisions} labels={labels} className="mt-8 lg:motion-safe:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
