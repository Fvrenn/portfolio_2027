import { SiteLink } from '@/components/navigation/SiteLink'
import { cn } from '@/lib/cn'

interface TrailSignProps {
  href: string
  title: string
  eyebrow?: string
  walkingTime?: string
  className?: string
}

const SCREW = 'absolute left-2.5 size-1.5 rounded-full bg-ink/35'

export function TrailSign({ href, title, eyebrow, walkingTime, className }: TrailSignProps) {
  return (
    <SiteLink href={href} className={cn('group block drop-shadow-[0_4px_3px_rgb(0_0_0/0.2)]', className)}>
      <span className="relative block bg-sign shape-sign py-3.5 pr-14 pl-6 text-ink shadow-[inset_0_-4px_0_rgb(0_0_0/0.12)] transition-transform duration-300 ease-spring group-hover:translate-x-1">
        <span className={cn(SCREW, 'top-2')} aria-hidden="true" />
        <span className={cn(SCREW, 'bottom-2')} aria-hidden="true" />
        {eyebrow && <span className="block font-mono text-[11px] tracking-[1.4px] text-ink/70 uppercase">{eyebrow}</span>}
        <span className="flex items-baseline justify-between gap-4">
          <span className="font-serif text-[clamp(20px,1vw+15px,26px)] leading-tight">{title}</span>
          {walkingTime && <span className="shrink-0 font-mono text-sm font-medium">{walkingTime}</span>}
        </span>
      </span>
    </SiteLink>
  )
}
