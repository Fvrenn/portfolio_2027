import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { TRAIL_VIEWBOX_WIDTH } from '@/lib/trail'
import { MOTION_ALLOWED_QUERY } from './useMediaQuery'

interface TrailRefs {
  sectionRef: RefObject<HTMLElement | null>
  pathRef: RefObject<SVGPathElement | null>
  revealPathRef: RefObject<SVGPathElement | null>
  markerRef: RefObject<HTMLElement | null>
}

interface TrailGeometry {
  path: string
  height: number
}

const PERCENT = 100
const WALKING_IDLE_DELAY_S = 0.15
const FACING_SAMPLE_PROGRESS = 0.002
const FACING_MIN_DELTA_X = 0.05

export function useTrailProgress({ sectionRef, pathRef, revealPathRef, markerRef }: TrailRefs, geometry: TrailGeometry) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        const path = pathRef.current
        const revealPath = revealPathRef.current
        const marker = markerRef.current
        const walker = marker?.querySelector<HTMLElement>('[data-walker]')
        if (!path || !revealPath || !marker || !walker) return
        const totalLength = path.getTotalLength()
        const stopWalking = gsap.delayedCall(WALKING_IDLE_DELAY_S, () => delete marker.dataset.walking).pause()

        const render = (progress: number) => {
          revealPath.style.strokeDashoffset = String(1 - progress)
          marker.toggleAttribute('data-idle', progress === 0)
          const point = path.getPointAtLength(progress * totalLength)
          marker.style.left = `${(point.x / TRAIL_VIEWBOX_WIDTH) * PERCENT}%`
          marker.style.top = `${(point.y / geometry.height) * PERCENT}%`
          const facing = getFacing(path, progress, totalLength)
          if (facing) walker.dataset.facing = facing
        }

        const walk = (progress: number) => {
          render(progress)
          marker.dataset.walking = ''
          stopWalking.restart(true)
        }

        render(0)
        ScrollTrigger.create({
          trigger: path.ownerSVGElement,
          start: 'top 60%',
          end: 'bottom 60%',
          onUpdate: (self) => walk(self.progress),
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef, dependencies: [geometry.path, geometry.height], revertOnUpdate: true },
  )
}

function getFacing(path: SVGPathElement, progress: number, totalLength: number) {
  const ahead = path.getPointAtLength(Math.min(progress + FACING_SAMPLE_PROGRESS, 1) * totalLength)
  const behind = path.getPointAtLength(Math.max(progress - FACING_SAMPLE_PROGRESS, 0) * totalLength)
  const deltaX = ahead.x - behind.x
  if (Math.abs(deltaX) < FACING_MIN_DELTA_X) return ''
  return deltaX > 0 ? 'right' : 'left'
}
