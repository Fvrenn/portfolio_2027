import { BrowserFrame } from '@/components/ui/BrowserFrame'
import type { Project, ProjectScreenshot } from '@/content/projects'
import { cn } from '@/lib/cn'

interface ProjectCardProps {
  project: Project
  resultLabel: string
  linkLabel: string
  screenshotPlaceholder: string
  className?: string
}

export function ProjectCard({ project, resultLabel, linkLabel, screenshotPlaceholder, className }: ProjectCardProps) {
  const { stage, altitude, title, url, problem, result, stack, href, screenshot } = project

  return (
    <article data-reveal className={cn('relative', className)}>
      <BrowserFrame url={url}>
        <Screenshot screenshot={screenshot} placeholder={screenshotPlaceholder} />
      </BrowserFrame>
      <div className="relative -mt-6 ml-6 rounded-2xl bg-white p-6 shadow-object sm:ml-10 sm:p-7">
        <p className="font-mono text-xs tracking-[1.4px] text-trail-dark uppercase">
          {stage} · {altitude}
        </p>
        <h3 className="mt-1.5 font-serif text-[clamp(28px,3vw,38px)] leading-tight">{title}</h3>
        <p className="mt-2 text-ink/75">{problem}</p>
        <p className="mt-3 text-sm">
          <span className="font-mono text-[11px] tracking-[1.4px] text-ink/50 uppercase">{resultLabel} · </span>
          <span className="font-medium">{result}</span>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {stack.map((technology) => (
            <span key={technology} className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[11px] text-ink/70">
              {technology}
            </span>
          ))}
          {href && (
            <a href={href} className="ml-auto font-medium underline decoration-trail decoration-2 underline-offset-4">
              {linkLabel} →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Screenshot({ screenshot, placeholder }: { screenshot: ProjectScreenshot; placeholder: string }) {
  if (!screenshot.src) {
    return (
      <div className="grid size-full place-items-center bg-[repeating-linear-gradient(135deg,var(--color-map-grid)_0_1px,transparent_1px_14px)]">
        <span className="rounded-full bg-white px-3 py-1.5 font-mono text-xs text-ink/50 shadow-object">{placeholder}</span>
      </div>
    )
  }
  return <img src={screenshot.src} alt={screenshot.alt} loading="lazy" decoding="async" className="size-full object-cover object-top" />
}
