import { useContext } from 'react'
import { LocaleContext } from '@/i18n/LocaleContext'
import type { Localized } from '@/i18n/locale'

export const useLocale = () => useContext(LocaleContext)

export function useLocalized<T>(content: Localized<T>): T {
  return content[useLocale().locale]
}
