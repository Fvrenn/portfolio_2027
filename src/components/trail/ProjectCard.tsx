import { Link } from 'react-router'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { Screenshot } from '@/components/ui/Screenshot'
import { TopoSheet } from '@/components/ui/TopoSheet'
import type { Project } from '@/content/projects'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/cn'
import { toAltitudeLabel } from '@/lib/format'
import { toProjectPath } from '@/lib/routes'

interface ProjectCardProps {
  project: Project
  resultLabel: string
  linkLabel: string
  screenshotPlaceholder: string
  className?: string
}

export function ProjectCard({ project, resultLabel, linkLabel, screenshotPlaceholder, className }: ProjectCardProps) {
  const { locale } = useLocale()
  const { slug, stage, altitudeM, title, url, problem, result, stack, screenshot } = project

  return (
    <article data-reveal className={cn('relative', className)}>
      <Link
        to={toProjectPath(slug)}
        aria-label={`${linkLabel} : ${title}`}
        data-cursor-label={linkLabel}
        className="group block transition-transform duration-300 ease-spring outline-offset-8 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-trail"
      >
        <BrowserFrame url={url}>
          <Screenshot src={screenshot.src} alt={screenshot.alt} placeholder={screenshotPlaceholder} />
        </BrowserFrame>
        <TopoSheet label={stage} reference={toAltitudeLabel(altitudeM, locale)} className="-mt-6 ml-6 sm:ml-10">
          <h3 className="mt-3 font-serif text-[clamp(28px,3vw,38px)] leading-tight">{title}</h3>
          <p className="mt-2 text-ink/75">{problem}</p>
          <p className="mt-3 border-t border-dotted border-topo pt-3 text-sm">
            <span className="font-mono text-[11px] tracking-[1.4px] text-topo-index uppercase">{resultLabel} · </span>
            <span className="font-medium">{result}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {stack.map((technology) => (
              <span key={technology} className="border border-topo/60 px-2 py-0.5 font-mono text-[11px] text-ink/70">
                {technology}
              </span>
            ))}
            <span className="ml-auto font-medium underline decoration-trail decoration-2 underline-offset-4">
              {linkLabel} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </TopoSheet>
      </Link>
    </article>
  )
}
