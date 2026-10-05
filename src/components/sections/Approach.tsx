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
    <section id={SECTION_IDS.approach} className="relative z-2 bg-cream px-6 pt-[clamp(120px,14vw,208px)] pb-[clamp(80px,10vw,128px)]">
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
        <p className="mt-[clamp(24px,4vw,40px)] max-w-[620px] text-[clamp(16px,0.4vw+15px,18px)] text-ink/70 sm:ml-auto">{aside}</p>
      </div>
    </section>
  )
}
