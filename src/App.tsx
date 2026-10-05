import { Altimeter } from '@/components/altimeter/Altimeter'
import { Hero } from '@/components/hero/Hero'
import { LocaleProvider } from '@/components/i18n/LocaleProvider'
import { SiteNav } from '@/components/navigation/SiteNav'
import { Approach } from '@/components/sections/Approach'
import { Bag } from '@/components/sections/Bag'
import { Bivouac } from '@/components/sections/Bivouac'
import { Journey } from '@/components/sections/Journey'
import { Summit } from '@/components/sections/Summit'
import { Trail } from '@/components/sections/Trail'
import { navigationContent } from '@/content/navigation'
import { useLocale } from '@/hooks/useLocale'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const DOCUMENT_TITLES = { fr: navigationContent.fr.documentTitle, en: navigationContent.en.documentTitle }

export default function App() {
  return (
    <LocaleProvider documentTitles={DOCUMENT_TITLES}>
      <Page />
    </LocaleProvider>
  )
}

function Page() {
  const { locale } = useLocale()
  useSmoothScroll()

  return (
    <>
      <SiteNav />
      <main key={locale}>
        <Hero />
        <Approach />
        <Trail />
        <Bag />
        <Journey />
        <Bivouac />
        <Summit />
      </main>
      <Altimeter />
    </>
  )
}
