import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext } from '@/i18n/LocaleContext'
import type { Locale } from '@/i18n/locale'
import { readStoredLocale, storeLocale } from '@/i18n/localeStorage'

interface LocaleProviderProps {
  documentTitles: Record<Locale, string>
  children: ReactNode
}

export function LocaleProvider({ documentTitles, children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = documentTitles[locale]
    storeLocale(locale)
  }, [locale, documentTitles])

  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LocaleContext value={value}>{children}</LocaleContext>
}
