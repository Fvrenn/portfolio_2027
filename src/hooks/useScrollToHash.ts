import { useEffect } from 'react'
import { useLocation } from 'react-router'

const SETTLE_DELAY_MS = 120

export function useScrollToHash() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return
    const timeout = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    }, SETTLE_DELAY_MS)
    return () => clearTimeout(timeout)
  }, [hash, key])
}
