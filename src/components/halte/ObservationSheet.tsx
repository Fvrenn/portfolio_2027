import { Link } from 'react-router'
import { TopoSheet } from '@/components/ui/TopoSheet'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { HALTE_SECTION_IDS, SECTION_IDS, toAnchor } from '@/content/sections'
import { useLocale } from '@/hooks/useLocale'
import { toAltitudeLabel } from '@/lib/format'
import { HOME_PATH } from '@/lib/routes'

interface ObservationSheetProps {
  project: Project
  detail: ProjectDetail
  labels: HalteLabels
}

const secondaryLink = 'border border-ink/30 px-5 py-2.5 text-sm transition-colors hover:bg-ink/5'

export function ObservationSheet({ project, detail, labels }: ObservationSheetProps) {
  const { locale } = useLocale()
  const { sheet } = labels
  const facts = [
    { label: sheet.audienceLabel, value: detail.audience },
    { label: sheet.roleLabel, value: detail.role },
    { label: sheet.durationLabel, value: detail.duration },
    { label: sheet.outcomeLabel, value: detail.outcome },
  ]

  return (
    <TopoSheet label={sheet.title} reference={`${project.stage} · ${toAltitudeLabel(project.altitudeM, locale)}`}>
      <Link
        to={{ pathname: HOME_PATH, hash: toAnchor(SECTION_IDS.projects) }}
        className="mt-3 inline-block font-mono text-[11px] tracking-[1.4px] text-ink/55 uppercase transition-colors hover:text-ink"
      >
        ← {labels.backLabel}
      </Link>
      <h1 className="mt-2 font-serif text-[clamp(34px,2.6vw+18px,56px)] leading-[1.05] text-balance">{project.title}</h1>
      <p className="mt-3 text-ink/75">{detail.oneLiner}</p>
      <dl className="mt-5 grid border-t border-topo-index sm:grid-cols-2">
        {facts.map(({ label, value }) => (
          <div key={label} className="border-b border-dotted border-topo py-2 sm:odd:border-r sm:odd:pr-3 sm:even:pl-3">
            <dt className="font-mono text-[10px] tracking-[1.2px] text-topo-index uppercase">{label}</dt>
            <dd className="mt-0.5 text-[15px] leading-snug">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={toAnchor(HALTE_SECTION_IDS.demo)}
          className="bg-ink px-5 py-2.5 text-sm text-cream-text transition-colors hover:bg-trail-dark"
        >
          {sheet.demoLabel}
        </a>
        {detail.links.code && (
          <a href={detail.links.code} className={secondaryLink}>
            {sheet.codeLabel}
          </a>
        )}
        {detail.links.live && (
          <a href={detail.links.live} className={secondaryLink}>
            {sheet.liveLabel}
          </a>
        )}
      </div>
    </TopoSheet>
  )
}
