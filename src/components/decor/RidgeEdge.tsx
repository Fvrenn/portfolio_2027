import { buildRidgeEdgePath, RIDGE_VIEWBOX_HEIGHT, RIDGE_VIEWBOX_WIDTH, type RidgeWindow } from '@/lib/ridgeEdge'
import { MOUNTAIN_RIDGE_PROFILE } from './ridgeProfile'

export type RidgeVariant = 'east' | 'west' | 'refuge' | 'summit'

const VARIANTS: Record<RidgeVariant, { front: RidgeWindow; back: RidgeWindow }> = {
  east: {
    front: { startRatio: 0, spanRatio: 0.6, isMirrored: false },
    back: { startRatio: 0.2, spanRatio: 0.8, isMirrored: true },
  },
  west: {
    front: { startRatio: 0.4, spanRatio: 0.6, isMirrored: true },
    back: { startRatio: 0, spanRatio: 0.8, isMirrored: false },
  },
  refuge: {
    front: { startRatio: 0.1, spanRatio: 0.55, isMirrored: true },
    back: { startRatio: 0.35, spanRatio: 0.65, isMirrored: false },
  },
  summit: {
    front: { startRatio: 0.25, spanRatio: 0.6, isMirrored: false },
    back: { startRatio: 0.1, spanRatio: 0.8, isMirrored: true },
  },
}

const BACK_HEIGHTS = { peakY: 0, valleyY: 70 }
const FRONT_HEIGHTS = { peakY: 25, valleyY: 96 }

interface RidgeEdgeProps {
  variant: RidgeVariant
  frontClassName: string
  backClassName: string
}

export function RidgeEdge({ variant, frontClassName, backClassName }: RidgeEdgeProps) {
  const { front, back } = VARIANTS[variant]
  const backPath = buildRidgeEdgePath(MOUNTAIN_RIDGE_PROFILE, { ...back, ...BACK_HEIGHTS })
  const frontPath = buildRidgeEdgePath(MOUNTAIN_RIDGE_PROFILE, { ...front, ...FRONT_HEIGHTS })

  return (
    <svg
      viewBox={`0 0 ${RIDGE_VIEWBOX_WIDTH} ${RIDGE_VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-2px)] z-1 h-[90px] w-full sm:h-[160px]"
      aria-hidden="true"
    >
      <path d={backPath} className={backClassName} />
      <path d={frontPath} className={frontClassName} />
    </svg>
  )
}
