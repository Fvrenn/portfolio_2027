import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router'
import { HOME_PATH } from '@/lib/routes'

type SiteLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string }

const isSectionAnchor = (href: string) => href.startsWith('#')

export function SiteLink({ href, ...props }: SiteLinkProps) {
  const { pathname } = useLocation()
  if (!isSectionAnchor(href)) return <Link to={href} {...props} />
  if (pathname === HOME_PATH) return <a href={href} {...props} />
  return <Link to={{ pathname: HOME_PATH, hash: href }} {...props} />
}
