import { useEffect, type RefObject } from 'react'
import { clamp } from '@/lib/math'
import { NARROW_VIEWPORT_QUERY } from './useMediaQuery'

const SIDE_GUTTER_PX = 96
const MIN_SCALE = 0.55
const FULL_SCALE_MIN_WIDTH_PX = 1100

export function useFitScale(targetRef: RefObject<HTMLElement | null>, contentWidthPx: number) {
  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    const stackedLayout = window.matchMedia(NARROW_VIEWPORT_QUERY)

    const applyScale = () => {
      target.style.scale = String(getFitScale(window.innerWidth, contentWidthPx, stackedLayout.matches))
    }

    applyScale()
    window.addEventListener('resize', applyScale, { passive: true })
    return () => window.removeEventListener('resize', applyScale)
  }, [targetRef, contentWidthPx])
}

function getFitScale(viewportWidthPx: number, contentWidthPx: number, isStacked: boolean) {
  if (isStacked || viewportWidthPx > FULL_SCALE_MIN_WIDTH_PX) return 1
  return clamp((viewportWidthPx - SIDE_GUTTER_PX) / contentWidthPx, MIN_SCALE, 1)
}
