import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TopoSheetProps {
  label: string
  reference: string
  children: ReactNode
  className?: string
}

export function TopoSheet({ label, reference, children, className }: TopoSheetProps) {
  return (
    <div className={cn('frame-topo', className)}>
      <div className="border border-topo-index p-[clamp(16px,2.4vw,24px)]">
        <p className="flex justify-between gap-3 border-b border-topo-index pb-2 font-mono text-[10.5px] tracking-[1.2px] text-topo-index uppercase">
          <span>{label}</span>
          <span className="text-right">{reference}</span>
        </p>
        {children}
      </div>
    </div>
  )
}
