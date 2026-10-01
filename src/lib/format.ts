import { NUMBER_LOCALES, type Locale } from '@/i18n/locale'

export const toAltitudeLabel = (meters: number, locale: Locale) =>
  `${new Intl.NumberFormat(NUMBER_LOCALES[locale], { maximumFractionDigits: 0 }).format(meters)} m`

export const toHeadingLabel = (deg: number) => `${String(Math.round(deg)).padStart(3, '0')}°`
