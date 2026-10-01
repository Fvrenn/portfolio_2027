import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BrowserFrameProps {
  url: string
  children: ReactNode
  className?: string
}

const WINDOW_DOTS = ['bg-alert/70', 'bg-gold', 'bg-map-forest']

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-object', className)}>
      <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {WINDOW_DOTS.map((color) => (
            <span key={color} className={cn('size-2.5 rounded-full', color)} />
          ))}
        </div>
        <span className="flex-1 truncate rounded-full bg-ink/5 px-3 py-1 text-center font-mono text-[11px] text-ink/55">{url}</span>
      </div>
      <div className="aspect-16/10 bg-cream">{children}</div>
    </div>
  )
}
