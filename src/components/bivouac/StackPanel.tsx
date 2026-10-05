import { projectsContent, type Project } from '@/content/projects'
import { SECTION_IDS, toAnchor } from '@/content/sections'
import { stackContent } from '@/content/stack'
import { useLocalized } from '@/hooks/useLocale'
import { findProjectsUsing } from '@/lib/stack'
import { NightPanel } from './NightPanel'

export function StackPanel() {
  const { title, intro, usedInLabel, groups } = useLocalized(stackContent)
  const { projects } = useLocalized(projectsContent)

  return (
    <NightPanel title={title} intro={intro}>
      <dl className="mt-6 space-y-5">
        {groups.map(({ id, label, tools }) => (
          <div key={id}>
            <dt className="font-mono text-[11px] tracking-[1.4px] text-campfire uppercase">{label}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Tool key={tool} name={tool} projects={findProjectsUsing(tool, projects)} usedInLabel={usedInLabel} />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </NightPanel>
  )
}

interface ToolProps {
  name: string
  projects: Project[]
  usedInLabel: string
}

const chipClassName = 'inline-flex items-center gap-2 rounded-full border border-cream-text/20 px-3 py-1.5 font-mono text-sm'

function Tool({ name, projects, usedInLabel }: ToolProps) {
  if (projects.length === 0) return <span className={chipClassName}>{name}</span>

  return (
    <span tabIndex={0} className={`${chipClassName} group relative cursor-default outline-campfire focus-visible:outline-2`}>
      <span className="size-1.5 rounded-full bg-campfire" aria-hidden="true" />
      {name}
      <span className="invisible absolute bottom-full left-0 z-10 mb-2 w-max max-w-[240px] rounded-xl bg-cream-text px-3 py-2 text-ink opacity-0 shadow-object transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <span className="block font-mono text-[10px] tracking-[1.2px] text-ink/50 uppercase">{usedInLabel}</span>
        {projects.map((project) => (
          <a key={project.slug} href={toAnchor(SECTION_IDS.projects)} className="block font-sans text-sm underline decoration-trail decoration-2 underline-offset-4">
            {project.title}
          </a>
        ))}
      </span>
    </span>
  )
}
