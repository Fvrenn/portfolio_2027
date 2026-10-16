import { DeviceScreen } from '@/components/ui/DeviceScreen'
import { TopoSheet } from '@/components/ui/TopoSheet'
import type { AboutContent } from '@/content/about'
import { cn } from '@/lib/cn'
import { Polaroid } from './Polaroid'

const PHOTO_PLACEMENTS = ['left-0 top-0 -rotate-6', 'left-[21%] top-[6%] rotate-3', 'left-[42%] top-[2%] -rotate-2']

interface ExpeditionCardProps {
  expedition: AboutContent['camp']['expedition']
  className?: string
}

export function ExpeditionCard({ expedition, className }: ExpeditionCardProps) {
  return (
    <article data-table-card className={className}>
      <TopoSheet label={expedition.label} reference={expedition.title} className="h-full">
        <div className="mt-4 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[300px]">
            {expedition.photos.map((photo, i) => (
              <Polaroid
                key={i}
                photo={photo}
                placeholder={expedition.photoPlaceholder}
                className={cn('absolute w-[58%]', PHOTO_PLACEMENTS[i])}
              />
            ))}
          </div>
          <div>
            <h3 className="font-serif text-[clamp(28px,1.6vw+18px,40px)] leading-tight">{expedition.title}</h3>
            <p className="mt-2 text-[15px] text-ink/75">{expedition.text}</p>
          </div>
        </div>
        <DeviceScreen label={expedition.label} readings={expedition.stats} className="mt-5" />
      </TopoSheet>
    </article>
  )
}
