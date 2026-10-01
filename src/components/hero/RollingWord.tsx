import { useEffect, useState, type TransitionEvent } from 'react'
import { SplitLetters } from '@/components/ui/SplitLetters'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

const HOLD_MS = 900
const REDUCED_MOTION_HOLD_MS = HOLD_MS * 2
const ROLL_PROPERTIES = ['translate', 'transform']

interface RollingWordProps {
  words: string[]
  className?: string
}

export function RollingWord({ words, className }: RollingWordProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const currentWord = words[wordIndex % words.length]
  const nextWord = words[(wordIndex + 1) % words.length]

  useEffect(() => {
    if (isRolling) return
    const timeout = prefersReducedMotion
      ? setTimeout(() => setWordIndex((index) => index + 1), REDUCED_MOTION_HOLD_MS)
      : setTimeout(() => setIsRolling(true), HOLD_MS)
    return () => clearTimeout(timeout)
  }, [isRolling, wordIndex, prefersReducedMotion])

  const handleTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== event.currentTarget || !ROLL_PROPERTIES.includes(event.propertyName)) return
    setWordIndex((index) => index + 1)
    setIsRolling(false)
  }

  return (
    <span
      className={cn(
        'block h-[1.2em] overflow-clip leading-[1.2]',
        isRolling ? '[overflow-clip-margin:0px]' : '[overflow-clip-margin:30px]',
        className,
      )}
    >
      <span
        onTransitionEnd={handleTransitionEnd}
        className={cn(
          'block will-change-transform',
          isRolling
            ? '-translate-y-[1.2em] transition-transform duration-[560ms] ease-roll'
            : 'translate-y-0 transition-none',
        )}
      >
        <span className="block">
          <SplitLetters text={currentWord} />
        </span>
        <span className="block" aria-hidden="true">
          <SplitLetters text={nextWord} />
        </span>
      </span>
    </span>
  )
}
