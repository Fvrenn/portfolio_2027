import { useEffect, useState, type RefObject } from 'react'
import { getBearingDeg, normalizeDeg } from '@/lib/math'
import { stepAngularSpring, type AngularSpring } from '@/lib/spring'

const NEEDLE_SPRING = { stiffness: 0.05, damping: 0.86 }
const IDLE_DELAY_MS = 2500
const IDLE_PERIOD_MS = 1800
const IDLE_SWING_DEG = 25
const PIVOT_DEAD_ZONE_PX = 4

interface CompassNeedleRefs {
  dialRef: RefObject<HTMLElement | null>
  needleRef: RefObject<HTMLElement | null>
}

export function useCompassNeedle({ dialRef, needleRef }: CompassNeedleRefs, prefersReducedMotion: boolean) {
  const [headingDeg, setHeadingDeg] = useState(0)

  useEffect(() => {
    const dial = dialRef.current
    const needle = needleRef.current
    if (!dial || !needle) return

    let spring: AngularSpring = { angleDeg: 0, velocityDeg: 0 }
    let pointerTargetDeg = 0
    let lastPointerAtMs = -Infinity
    let frame = 0

    const handlePointer = (event: PointerEvent) => {
      const bearingDeg = getPointerBearingDeg(dial, event)
      if (bearingDeg === null) return
      pointerTargetDeg = bearingDeg
      lastPointerAtMs = performance.now()
    }

    const tick = (nowMs: number) => {
      const targetDeg = nowMs - lastPointerAtMs > IDLE_DELAY_MS ? getIdleSwingDeg(nowMs) : pointerTargetDeg
      spring = prefersReducedMotion
        ? { angleDeg: targetDeg, velocityDeg: 0 }
        : stepAngularSpring(spring, targetDeg, NEEDLE_SPRING)
      needle.style.rotate = `${spring.angleDeg}deg`
      setHeadingDeg(Math.round(normalizeDeg(spring.angleDeg)) % 360)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('pointerdown', handlePointer, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('pointerdown', handlePointer)
    }
  }, [dialRef, needleRef, prefersReducedMotion])

  return headingDeg
}

function getPointerBearingDeg(dial: HTMLElement, event: PointerEvent): number | null {
  const rect = dial.getBoundingClientRect()
  const dx = event.clientX - (rect.left + rect.width / 2)
  const dy = event.clientY - (rect.top + rect.height / 2)
  return Math.hypot(dx, dy) < PIVOT_DEAD_ZONE_PX ? null : getBearingDeg(dx, dy)
}

const getIdleSwingDeg = (nowMs: number) => Math.sin(nowMs / IDLE_PERIOD_MS) * IDLE_SWING_DEG
