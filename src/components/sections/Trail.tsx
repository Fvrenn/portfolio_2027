import { useRef } from 'react'
import { MapDetails } from '@/components/map/MapDetails'
import { TopoMap } from '@/components/map/TopoMap'
import { TrailMarkers } from '@/components/trail/TrailMarkers'
import { TrailPath } from '@/components/trail/TrailPath'
import { ProjectCard } from '@/components/trail/ProjectCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectsContent } from '@/content/projects'
import { SECTION_IDS } from '@/content/sections'
import { useLocalized } from '@/hooks/useLocale'
import { NARROW_VIEWPORT_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useTrailProgress } from '@/hooks/useTrailProgress'
import { cn } from '@/lib/cn'
import { buildTrailPath, buildTrailPoints, getTrailHeight } from '@/lib/trail'

const WIDE_COLUMNS_X = [20, 80]
const NARROW_COLUMNS_X = [6]

export function Trail() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const revealPathRef = useRef<SVGPathElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const isNarrow = useMediaQuery(NARROW_VIEWPORT_QUERY)

  const { eyebrow, title, intro, projects, map, ...labels } = useLocalized(projectsContent)
  const points = buildTrailPoints(projects.length, isNarrow ? NARROW_COLUMNS_X : WIDE_COLUMNS_X)
  const path = buildTrailPath(points)
  const height = getTrailHeight(projects.length)

  useRevealOnScroll(sectionRef)
  useTrailProgress({ sectionRef, pathRef, revealPathRef, markerRef }, { path, height })

  return (
    <section ref={sectionRef} id={SECTION_IDS.projects} className="relative z-2 overflow-hidden bg-cream px-6 py-32">
      <TopoMap />
      <MapDetails {...map} />
      <div className="relative mx-auto max-w-[1240px]">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <div className="relative mt-12 grid auto-rows-fr">
          <TrailPath path={path} height={height} pathRef={pathRef} revealPathRef={revealPathRef} />
          <TrailMarkers points={points} height={height} markerLabel={labels.markerLabel} markerRef={markerRef} />
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={cn('flex items-center py-10 max-sm:pl-12', i % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start')}
            >
              <ProjectCard
                project={project}
                resultLabel={labels.resultLabel}
                linkLabel={labels.linkLabel}
                screenshotPlaceholder={labels.screenshotPlaceholder}
                className="w-full sm:w-[60%]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
