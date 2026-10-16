import { Navigate, useParams } from 'react-router'
import { Altimeter } from '@/components/altimeter/Altimeter'
import { HalteDemo } from '@/components/halte/HalteDemo'
import { HalteEvening } from '@/components/halte/HalteEvening'
import { HalteGallery } from '@/components/halte/HalteGallery'
import { HalteNotebook } from '@/components/halte/HalteNotebook'
import { HalteReadings } from '@/components/halte/HalteReadings'
import { HalteValley } from '@/components/halte/HalteValley'
import { toHalteAltitudeRange } from '@/content/altimeter'
import { halteContent } from '@/content/halte'
import { projectDetailsContent } from '@/content/projectDetails'
import { projectsContent } from '@/content/projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { HOME_PATH } from '@/lib/routes'

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const { locale } = useLocale()
  const { projects } = useLocalized(projectsContent)
  const details = useLocalized(projectDetailsContent)
  const labels = useLocalized(halteContent)
  useScrollToTop(slug)

  const index = projects.findIndex((project) => project.slug === slug)
  const project = projects[index]
  useDocumentTitle(project ? `${project.title}, ${labels.eyebrow}` : '')

  const detail = details[slug]
  if (!project || !detail) return <Navigate to={HOME_PATH} replace />
  const nextProject = projects[(index + 1) % projects.length]

  return (
    <>
      <main key={`${locale}-${slug}`}>
        <HalteValley project={project} detail={detail} labels={labels} />
        <HalteGallery gallery={detail.gallery} url={project.url} labels={labels.gallery} />
        <HalteNotebook decisions={detail.decisions} labels={labels.notebook} />
        <HalteDemo project={project} detail={detail} labels={labels.demo} screenshotPlaceholder={labels.binoculars.screenshotPlaceholder} />
        <HalteReadings readings={detail.readings} projectTitle={project.title} labels={labels.readings} />
        <HalteEvening project={project} detail={detail} nextProject={nextProject} labels={labels} />
      </main>
      <Altimeter range={toHalteAltitudeRange(project.altitudeM)} />
    </>
  )
}
