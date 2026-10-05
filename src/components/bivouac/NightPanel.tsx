import type { ReactNode } from 'react'

interface NightPanelProps {
  title: string
  intro: string
  children: ReactNode
}

export function NightPanel({ title, intro, children }: NightPanelProps) {
  return (
    <div data-reveal className="min-w-0 rounded-3xl border border-cream-text/10 bg-cream-text/5 p-[clamp(20px,3vw,32px)] backdrop-blur-sm">
      <h3 className="font-serif text-[clamp(28px,3vw,38px)] leading-tight">{title}</h3>
      <p className="mt-2 text-cream-text/70">{intro}</p>
      {children}
    </div>
  )
}
