import { useState, type Ref } from 'react'
import type { HalteLabels } from '@/content/halte'

interface DemoDialogProps {
  dialogRef: Ref<HTMLDialogElement>
  src: string
  isOpen: boolean
  labels: HalteLabels['demo']
  onClose: () => void
}

const toolButton = 'cursor-pointer rounded-full border border-ink/15 px-3.5 py-1.5 text-sm transition-colors hover:bg-ink/5'

export function DemoDialog({ dialogRef, src, isOpen, labels, onClose }: DemoDialogProps) {
  const [session, setSession] = useState(0)

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      data-lenis-prevent
      className="m-auto h-[min(92vh,900px)] max-h-none w-[min(96vw,1400px)] max-w-none overflow-hidden rounded-2xl bg-cream p-0 text-ink shadow-object backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-2.5">
          <p className="truncate font-mono text-xs tracking-[1.2px] text-ink/60 uppercase">{labels.frameTitle}</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => setSession((count) => count + 1)} className={toolButton}>
              {labels.resetLabel}
            </button>
            <button type="button" onClick={onClose} className={toolButton}>
              {labels.closeLabel}
            </button>
          </div>
        </div>
        {isOpen && (
          <iframe
            key={session}
            src={src}
            title={labels.frameTitle}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="w-full flex-1 border-0 bg-white"
          />
        )}
      </div>
    </dialog>
  )
}
