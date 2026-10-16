import { AboutDeparture } from '@/components/about/AboutDeparture'
import { AboutHero } from '@/components/about/AboutHero'
import { CampTable } from '@/components/about/CampTable'
import { Clothesline } from '@/components/about/Clothesline'
import { PinnedMap } from '@/components/about/PinnedMap'
import { ScoutPatches } from '@/components/about/ScoutPatches'
import { Altimeter } from '@/components/altimeter/Altimeter'
import { aboutContent } from '@/content/about'
import { BASE_CAMP_ALTITUDE_RANGE } from '@/content/altimeter'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { ABOUT_PATH } from '@/lib/routes'

export default function AboutPage() {
  const { locale } = useLocale()
  const content = useLocalized(aboutContent)
  useScrollToTop(ABOUT_PATH)
  useDocumentTitle(content.documentTitle)

  return (
    <>
      <main key={locale}>
        <AboutHero content={content.hero} />
        <Clothesline content={content.clothesline} />
        <PinnedMap content={content.map} />
        <ScoutPatches content={content.patches} />
        <CampTable content={content.camp} />
        <AboutDeparture content={content.departure} />
      </main>
      <Altimeter range={BASE_CAMP_ALTITUDE_RANGE} />
    </>
  )
}
