import { cn } from '@/lib/cn'

export function TrailBlaze({ className }: { className?: string }) {
  return (
    <span className={cn('flex flex-col', className)} aria-hidden="true">
      <span className="h-2 bg-white" />
      <span className="h-2 bg-alert" />
    </span>
  )
}
