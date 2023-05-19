import { useIsMounted } from '~/hooks/useIsMounted'
import { LandingFooter } from '../footer'
import { LandingHeader } from '../header'

export default function LandingLayout({ children }) {
  const isMounted = useIsMounted()
  return (
    isMounted && (
      <>
        <LandingHeader />
        <main>{children}</main>
        <LandingFooter />
      </>
    )
  )
}
