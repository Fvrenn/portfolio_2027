import { Altimeter } from '@/components/altimeter/Altimeter'
import { Hero } from '@/components/hero/Hero'
import { Approach } from '@/components/sections/Approach'
import { Bag } from '@/components/sections/Bag'
import { Bivouac } from '@/components/sections/Bivouac'
import { Journey } from '@/components/sections/Journey'
import { Summit } from '@/components/sections/Summit'
import { Trail } from '@/components/sections/Trail'
import { ALTITUDE_RANGE } from '@/content/altimeter'
import { navigationContent } from '@/content/navigation'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { useScrollToHash } from '@/hooks/useScrollToHash'

export function HomePage() {
  const { locale } = useLocale()
  useDocumentTitle(useLocalized(navigationContent).documentTitle)
  useScrollToHash()

  return (
    <>
      <main key={locale}>
        <Hero />
        <Approach />
        <Trail />
        <Bag />
        <Journey />
        <Bivouac />
        <Summit />
      </main>
      <Altimeter range={ALTITUDE_RANGE} />
    </>
  )
}
