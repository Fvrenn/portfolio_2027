import { useEffect } from 'react'

export function useScrollToTop(key: string) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])
}
