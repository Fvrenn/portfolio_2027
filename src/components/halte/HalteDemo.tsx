import { useRef, useState } from 'react'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Screenshot } from '@/components/ui/Screenshot'
import type { HalteLabels } from '@/content/halte'
import type { ProjectDetail } from '@/content/projectDetails'
import type { Project } from '@/content/projects'
import { HALTE_SECTION_IDS } from '@/content/sections'
import { DemoDialog } from './DemoDialog'

interface HalteDemoProps {
  project: Project
  detail: ProjectDetail
  labels: HalteLabels['demo']
  screenshotPlaceholder: string
}

export function HalteDemo({ project, detail, labels, screenshotPlaceholder }: HalteDemoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    dialogRef.current?.showModal()
  }

  const handleClose = () => {
    dialogRef.current?.close()
    setIsOpen(false)
  }

  return (
    <section id={HALTE_SECTION_IDS.demo} className="bg-cream px-6 py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto max-w-[1100px]">
        <EyebrowHeading eyebrow={labels.eyebrow} title={labels.title} />
        <p className="mt-3 max-w-[60ch] text-ink/65">{labels.intro}</p>
        <div className="relative mt-[clamp(24px,4vw,40px)]">
          <BrowserFrame url={project.url}>
            {detail.video ? (
              <video src={detail.video} poster={project.screenshot.src} autoPlay muted loop playsInline className="size-full object-cover object-top" />
            ) : (
              <Screenshot src={project.screenshot.src} alt={project.screenshot.alt} placeholder={screenshotPlaceholder} />
            )}
          </BrowserFrame>
          <div className="absolute inset-0 top-[42px] grid place-items-center rounded-b-2xl bg-ink/35">
            {detail.links.demo ? (
              <button
                type="button"
                onClick={handleOpen}
                className="cursor-pointer rounded-full bg-ink px-6 py-3 font-medium text-cream-text shadow-object transition-transform duration-200 ease-spring hover:scale-105"
              >
                {labels.openLabel}
              </button>
            ) : (
              <span className="rounded-full bg-white px-5 py-2.5 font-mono text-xs text-ink/60 shadow-object">{labels.unavailableLabel}</span>
            )}
          </div>
        </div>
      </div>
      {detail.links.demo && (
        <DemoDialog dialogRef={dialogRef} src={detail.links.demo} isOpen={isOpen} labels={labels} onClose={handleClose} />
      )}
    </section>
  )
}
