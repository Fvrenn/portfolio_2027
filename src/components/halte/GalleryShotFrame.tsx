import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { PhoneFrame } from '@/components/ui/PhoneFrame'
import { Screenshot } from '@/components/ui/Screenshot'
import type { GalleryShot } from '@/content/projectDetails'

interface GalleryShotFrameProps {
  shot: GalleryShot
  url: string
  placeholder: string
}

export function GalleryShotFrame({ shot, url, placeholder }: GalleryShotFrameProps) {
  const screenshot = <Screenshot src={shot.src} alt={shot.alt} placeholder={placeholder} />
  if (shot.format === 'mobile') {
    return <PhoneFrame className="w-[min(58vw,240px)] lg:w-[calc(var(--shot-h)*390/844)]">{screenshot}</PhoneFrame>
  }
  return (
    <BrowserFrame url={url} className="w-[min(86vw,640px)] lg:w-[calc((var(--shot-h)-42px)*1.6)]">
      {screenshot}
    </BrowserFrame>
  )
}
