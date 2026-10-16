import { Screenshot } from '@/components/ui/Screenshot'
import type { Snapshot } from '@/content/about'
import { cn } from '@/lib/cn'

interface PolaroidProps {
  photo: Snapshot
  placeholder: string
  className?: string
}

export function Polaroid({ photo, placeholder, className }: PolaroidProps) {
  return (
    <figure className={cn('bg-white p-[6%] pb-[8%] shadow-object', className)}>
      <div className="aspect-square overflow-hidden">
        <Screenshot src={photo.src} alt={photo.alt} placeholder={placeholder} />
      </div>
      <figcaption className="mt-2 font-hand text-[clamp(15px,0.5vw+12px,20px)] leading-tight text-ink/80">{photo.caption}</figcaption>
    </figure>
  )
}
