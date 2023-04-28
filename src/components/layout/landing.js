import { LandingHeader } from '../header'
import { LandingFooter } from '../footer'

export default function LandingLayout({ children }) {
  return (
    <>
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </>
  )
}
