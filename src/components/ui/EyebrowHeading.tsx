interface EyebrowHeadingProps {
  eyebrow: string
  title: string
  className?: string
}

export function EyebrowHeading({ eyebrow, title, className }: EyebrowHeadingProps) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2 font-mono text-xs tracking-[1.4px] text-trail-dark uppercase">
        <span className="size-2 rounded-full bg-trail" />
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-[clamp(30px,2.4vw+18px,52px)] leading-[1.05] text-balance">{title}</h2>
    </div>
  )
}
