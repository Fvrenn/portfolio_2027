import { useRef } from 'react'
import { RidgeEdge } from '@/components/decor/RidgeEdge'
import { TopoLines } from '@/components/decor/TopoLines'
import { RevealWords } from '@/components/ui/RevealWords'
import { approachContent } from '@/content/approach'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { useWordReveal } from '@/hooks/useWordReveal'

export function Approach() {
  const statementRef = useRef<HTMLParagraphElement>(null)
  useWordReveal(statementRef)

  const { eyebrow, statement, aside } = useLocalized(approachContent)

  return (
    <section id={SECTION_IDS.approach} className="relative z-2 bg-cream px-6 pt-40 pb-32 sm:pt-52">
      <RidgeEdge variant="east" frontClassName="fill-cream" backClassName="fill-mist/70" />
      <TopoLines />
      <div className="relative mx-auto max-w-[980px]">
        <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-ink/60 uppercase">
          <span className="size-2 rounded-full bg-gold" />
          {eyebrow}
        </p>
        <p ref={statementRef} className="mt-6 font-serif text-[clamp(30px,4.4vw,60px)] leading-[1.15]">
          <RevealWords text={statement} />
        </p>
        <p className="mt-10 max-w-[620px] text-lg text-ink/70 sm:ml-auto">{aside}</p>
      </div>
    </section>
  )
}
