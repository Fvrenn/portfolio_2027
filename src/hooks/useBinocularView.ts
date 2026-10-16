import { useEffect, useRef, type RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { usePrefersReducedMotion } from './useMediaQuery'

interface ViewPosition {
  xPercent: number
  yPercent: number
}

interface ViewMovers {
  moveX: (value: number) => void
  moveY: (value: number) => void
}

const FOLLOW_DURATION_S = 0.7
const PERCENT = 100

export function useBinocularView(viewRef: RefObject<HTMLElement | null>, focus: ViewPosition) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const moversRef = useRef<ViewMovers | null>(null)
  const focusRef = useRef(focus)
  focusRef.current = focus

  useGSAP(
    () => {
      const view = viewRef.current
      if (!view) return
      const position = { x: focusRef.current.xPercent, y: focusRef.current.yPercent }
      const render = () => {
        view.style.setProperty('--view-x', `${position.x}%`)
        view.style.setProperty('--view-y', `${position.y}%`)
      }
      const follow = { duration: prefersReducedMotion ? 0 : FOLLOW_DURATION_S, ease: 'power3', onUpdate: render }
      moversRef.current = { moveX: gsap.quickTo(position, 'x', follow), moveY: gsap.quickTo(position, 'y', follow) }
      render()

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        const bounds = view.getBoundingClientRect()
        moversRef.current?.moveX(((event.clientX - bounds.left) / bounds.width) * PERCENT)
        moversRef.current?.moveY(((event.clientY - bounds.top) / bounds.height) * PERCENT)
      }
      const handlePointerLeave = () => {
        moversRef.current?.moveX(focusRef.current.xPercent)
        moversRef.current?.moveY(focusRef.current.yPercent)
      }

      view.addEventListener('pointermove', handlePointerMove, { passive: true })
      view.addEventListener('pointerleave', handlePointerLeave)
      return () => {
        view.removeEventListener('pointermove', handlePointerMove)
        view.removeEventListener('pointerleave', handlePointerLeave)
      }
    },
    { scope: viewRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  )

  useEffect(() => {
    moversRef.current?.moveX(focus.xPercent)
    moversRef.current?.moveY(focus.yPercent)
  }, [focus.xPercent, focus.yPercent])
}
