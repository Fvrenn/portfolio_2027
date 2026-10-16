import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface NotebookPageProps {
  children: ReactNode
  className?: string
}

export function NotebookPage({ children, className }: NotebookPageProps) {
  return (
    <div className={cn('relative drop-shadow-[0_6px_6px_rgb(0_0_0/0.18)]', className)}>
      <span className="absolute -top-1.5 left-1/2 z-1 h-6 w-[clamp(64px,22%,96px)] -translate-x-1/2 rotate-3 bg-gold/70" aria-hidden="true" />
      <div className="bg-notebook edge-torn py-[34px] pr-[clamp(18px,2.4vw,26px)] pl-[46px] leading-[28px]">{children}</div>
    </div>
  )
}
