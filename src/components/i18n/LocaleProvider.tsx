import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext } from '@/i18n/LocaleContext'
import type { Locale } from '@/i18n/locale'
import { readStoredLocale, storeLocale } from '@/i18n/localeStorage'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    storeLocale(locale)
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LocaleContext value={value}>{children}</LocaleContext>
}
