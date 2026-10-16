import { NUMBER_LOCALES, type Locale } from '@/i18n/locale'

const NON_BREAKING_SPACE = ' '

export const toAltitudeLabel = (meters: number, locale: Locale) => `${toCountLabel(meters, locale)}${NON_BREAKING_SPACE}m`

export const toHeadingLabel = (deg: number) => `${String(Math.round(deg)).padStart(3, '0')}°`

export const toCountLabel = (value: number, locale: Locale) =>
  new Intl.NumberFormat(NUMBER_LOCALES[locale], { maximumFractionDigits: 0 }).format(value)

const MINUTES_PER_HOUR = 60

export const toWalkingTimeLabel = (minutes: number) =>
  `${Math.floor(minutes / MINUTES_PER_HOUR)}${NON_BREAKING_SPACE}h${NON_BREAKING_SPACE}${String(minutes % MINUTES_PER_HOUR).padStart(2, '0')}`
