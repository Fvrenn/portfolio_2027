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

export function useTrailProgress({ sectionRef, pathRef, revealPathRef, markerRef }: TrailRefs, geometry: TrailGeometry) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MOTION_ALLOWED_QUERY, () => {
        const path = pathRef.current
        const revealPath = revealPathRef.current
        const marker = markerRef.current
        if (!path || !revealPath || !marker) return
        const totalLength = path.getTotalLength()

        const render = (progress: number) => {
          revealPath.style.strokeDashoffset = String(1 - progress)
          const point = path.getPointAtLength(progress * totalLength)
          marker.style.left = `${(point.x / TRAIL_VIEWBOX_WIDTH) * PERCENT}%`
          marker.style.top = `${(point.y / geometry.height) * PERCENT}%`
        }

        render(0)
        ScrollTrigger.create({
          trigger: path.ownerSVGElement,
          start: 'top 60%',
          end: 'bottom 60%',
          onUpdate: (self) => render(self.progress),
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef, dependencies: [geometry.path, geometry.height], revertOnUpdate: true },
  )
}
