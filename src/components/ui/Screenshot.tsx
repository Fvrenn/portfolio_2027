interface ScreenshotProps {
  src: string
  alt: string
  placeholder: string
}

export function Screenshot({ src, alt, placeholder }: ScreenshotProps) {
  if (!src) {
    return (
      <div className="grid size-full place-items-center bg-[repeating-linear-gradient(135deg,var(--color-map-grid)_0_1px,transparent_1px_14px)]">
        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs text-ink/50 shadow-object">{placeholder}</span>
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-cover object-top" />
}
