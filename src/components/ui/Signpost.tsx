import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { TrailBlaze } from './TrailBlaze'

const POLE = 'left-9 w-4'

export function Signpost({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative isolate pt-3 pb-[clamp(56px,7vw,96px)]', className)}>
      <span
        className={cn(POLE, 'absolute top-0 bottom-0 -z-1 rounded-t-sm bg-linear-to-r from-kraft-dark via-kraft to-kraft-dark')}
        aria-hidden="true"
      />
      <TrailBlaze className={cn(POLE, 'absolute bottom-[clamp(24px,3vw,40px)]')} />
      <div className="grid gap-2">{children}</div>
    </div>
  )
}
