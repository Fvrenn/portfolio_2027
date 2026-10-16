import { useEffect, type RefObject } from 'react'

interface GpsCursorRefs {
  cursorRef: RefObject<HTMLElement | null>
  haloRef: RefObject<HTMLElement | null>
  labelRef: RefObject<HTMLElement | null>
}

const INTERACTIVE_SELECTOR = 'a, button, summary, label, [role="button"], [data-cursor-label]'
const LABEL_SELECTOR = '[data-cursor-label]'
const ACTIVE_CLASS = 'has-gps-cursor'
const HALO_EASE = 0.18
const SETTLED_PX = 0.1

export function useGpsCursor({ cursorRef, haloRef, labelRef }: GpsCursorRefs, prefersReducedMotion: boolean) {
  useEffect(() => {
    const cursor = cursorRef.current
    const halo = haloRef.current
    const label = labelRef.current
    if (!cursor || !halo || !label) return

    const haloEase = prefersReducedMotion ? 1 : HALO_EASE
    const pointer = { x: 0, y: 0 }
    const haloPosition = { x: 0, y: 0 }
    let frame = 0

    const render = () => {
      haloPosition.x += (pointer.x - haloPosition.x) * haloEase
      haloPosition.y += (pointer.y - haloPosition.y) * haloEase
      cursor.style.translate = `${pointer.x}px ${pointer.y}px`
      halo.style.translate = `${haloPosition.x - pointer.x}px ${haloPosition.y - pointer.y}px`
      const isSettled = Math.abs(pointer.x - haloPosition.x) < SETTLED_PX && Math.abs(pointer.y - haloPosition.y) < SETTLED_PX
      frame = isSettled ? 0 : requestAnimationFrame(render)
    }
    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      if (cursor.dataset.visible === undefined) {
        haloPosition.x = event.clientX
        haloPosition.y = event.clientY
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      cursor.dataset.visible = ''
      updateHover(cursor, label, event.target)
      requestRender()
    }
    const handlePointerDown = () => {
      cursor.dataset.pressed = ''
    }
    const handlePointerUp = () => {
      delete cursor.dataset.pressed
    }
    const handleLeave = () => {
      delete cursor.dataset.visible
    }

    document.documentElement.classList.add(ACTIVE_CLASS)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    window.addEventListener('blur', handleLeave)
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove(ACTIVE_CLASS)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('blur', handleLeave)
    }
  }, [cursorRef, haloRef, labelRef, prefersReducedMotion])
}

function updateHover(cursor: HTMLElement, label: HTMLElement, target: EventTarget | null) {
  const element = target instanceof Element ? target : null
  const isInteractive = Boolean(element?.closest(INTERACTIVE_SELECTOR))
  const labelText = element?.closest<HTMLElement>(LABEL_SELECTOR)?.dataset.cursorLabel ?? ''
  if (isInteractive) cursor.dataset.hover = ''
  else delete cursor.dataset.hover
  if (label.textContent !== labelText) label.textContent = labelText
}
