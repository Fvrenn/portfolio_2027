interface StackedProject {
  stack: readonly string[]
}

export const findProjectsUsing = <T extends StackedProject>(tool: string, projects: readonly T[]) =>
  projects.filter(({ stack }) => stack.includes(tool))
