export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export type Localized<T> = Record<Locale, T>

export const NUMBER_LOCALES: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB' }

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)
