import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface LuggageTagProps {
  children: ReactNode
  className?: string
}

export function LuggageTag({ children, className }: LuggageTagProps) {
  return (
    <div className={cn('drop-shadow-[0_5px_4px_rgb(0_0_0/0.2)]', className)}>
      <div className="relative h-full bg-kraft shape-tag py-4 pr-4 pl-9 text-ink">
        <span
          className="absolute top-1/2 left-2.5 size-3 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_0_3px_var(--color-kraft-dark)]"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  )
}
