import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { GpsCursor } from '@/components/cursor/GpsCursor'
import { LocaleProvider } from '@/components/i18n/LocaleProvider'
import { SiteNav } from '@/components/navigation/SiteNav'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { ABOUT_PATH, HOME_PATH, PROJECT_PATH } from '@/lib/routes'
import { HomePage } from '@/pages/HomePage'

const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <Shell />
      </LocaleProvider>
    </BrowserRouter>
  )
}

function Shell() {
  useSmoothScroll()

  return (
    <>
      <SiteNav />
      <Suspense>
        <Routes>
          <Route path={HOME_PATH} element={<HomePage />} />
          <Route path={PROJECT_PATH} element={<ProjectPage />} />
          <Route path={ABOUT_PATH} element={<AboutPage />} />
          <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
        </Routes>
      </Suspense>
      <GpsCursor />
    </>
  )
}
