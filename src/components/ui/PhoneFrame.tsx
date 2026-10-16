import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface PhoneFrameProps {
  children: ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn('relative aspect-[390/844] overflow-hidden rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-object', className)}>
      <div className="size-full overflow-hidden rounded-[1.7rem] bg-cream">{children}</div>
      <span className="absolute top-2 left-1/2 h-4 w-1/3 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
    </div>
  )
}
