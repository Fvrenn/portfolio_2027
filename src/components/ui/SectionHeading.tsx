import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro: string
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <div data-reveal className={cn('max-w-[640px]', className)}>
      <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-ink/60 uppercase">
        <span className="size-2 rounded-full bg-gold" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-[clamp(44px,6vw,84px)] leading-none">{title}</h2>
      <p className="mt-5 text-lg text-ink/75">{intro}</p>
    </div>
  )
}
