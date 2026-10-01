import { CLOUD_FALLBACK_WIDTH, CLOUD_WIDTHS, CLOUDS } from '@/components/landscape/layers'
import { cn } from '@/lib/cn'
import { toSizedSrc, toSrcSet } from '@/lib/responsiveImage'
import { Sun } from './Sun'

export function SkyGroup() {
  return (
    <div data-parallax-depth={0.05} className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Sun className="absolute top-[calc(var(--sun-w)*-0.33)] right-[calc(var(--sun-w)*-0.171)] w-(--sun-w) motion-safe:animate-sun-turn" />
      {CLOUDS.map(({ path, widthVw, className }) => (
        <img
          key={path}
          src={toSizedSrc(path, CLOUD_FALLBACK_WIDTH)}
          srcSet={toSrcSet(path, CLOUD_WIDTHS)}
          sizes={`${widthVw}vw`}
          alt=""
          decoding="async"
          style={{ width: `${widthVw}vw` }}
          className={cn('absolute h-auto', className)}
        />
      ))}
    </div>
  )
}
