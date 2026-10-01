import { SplitLetters } from '@/components/ui/SplitLetters'
import { RollingWord } from './RollingWord'

interface HeroHeadingProps {
  eyebrow: string
  srTitle: string
  verticalLabel: string
  line1: string
  rollingWords: string[]
}

const headingLine =
  'font-serif font-normal whitespace-nowrap text-cream-text text-[clamp(40px,12vw,84px)] tracking-[1px] sm:absolute sm:text-[156px] sm:tracking-[3.1px]'

export function HeroHeading({ eyebrow, srTitle, verticalLabel, line1, rollingWords }: HeroHeadingProps) {
  return (
    <>
      <p className="relative flex items-center gap-2 text-center font-mono text-xs tracking-[1.4px] text-white uppercase sm:absolute sm:top-[calc(50vh-330px)] sm:left-[calc(50%-540px)] sm:text-sm sm:whitespace-nowrap">
        <span className="size-2.5 shrink-0 rounded-full bg-gold motion-safe:animate-pulse-dot" />
        {eyebrow}
      </p>
      <h1 className="relative flex flex-col items-center sm:static sm:block">
        <span className="sr-only">{srTitle}</span>
        <span aria-hidden="true" className="contents">
          <span className="absolute top-[calc(50vh-156px)] left-[calc(50%-588px)] hidden -translate-1/2 -rotate-90 font-mono text-sm tracking-[1.4px] whitespace-nowrap text-white sm:block">
            {verticalLabel}
          </span>
          <span className={`${headingLine} sm:top-[calc(50vh-322px)] sm:left-[calc(50%-540px)]`}>
            <SplitLetters text={line1} />
          </span>
          <RollingWord
            words={rollingWords}
            className={`${headingLine} sm:top-[calc(50vh-124px)] sm:left-[calc(50%-35px)]`}
          />
        </span>
      </h1>
    </>
  )
}
