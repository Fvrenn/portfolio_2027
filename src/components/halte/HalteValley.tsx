import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { MOTION_ALLOWED_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { HalteBinoculars } from './HalteBinoculars'
import { HalteHero } from './HalteHero'
import { ProblemPanel } from './ProblemPanel'
import { ValleyStage } from './ValleyStage'

const CINEMATIC_QUERY = `${MOTION_ALLOWED_QUERY} and (min-width: 1024px)`

interface HalteValleyProps {
  project: Project
  detail: ProjectDetail
  labels: HalteLabels
}

export function HalteValley({ project, detail, labels }: HalteValleyProps) {
  const isCinematic = useMediaQuery(CINEMATIC_QUERY)
  if (isCinematic) return <ValleyStage project={project} detail={detail} labels={labels} />

  return (
    <>
      <HalteHero project={project} detail={detail} labels={labels} />
      <ProblemPanel problem={detail.problem} labels={labels.mist} />
      <HalteBinoculars features={detail.features} url={project.url} labels={labels.binoculars} />
    </>
  )
}
