import { useLocale } from '@/hooks/useLocale'
import { LOCALES } from '@/i18n/locale'
import { cn } from '@/lib/cn'

export function LocaleToggle({ label }: { label: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div role="group" aria-label={label} className="ml-1 flex rounded-full bg-ink/5 p-0.5 font-mono text-[11px] uppercase">
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
          className={cn(
            'cursor-pointer rounded-full px-2 py-1.5 uppercase transition-colors',
            option === locale ? 'bg-white text-ink shadow-sm' : 'text-ink/50 hover:text-ink',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
