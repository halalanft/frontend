import { MintingHeader } from '../header'
import { MintingFooter } from '../footer'

export default function MintingLayout({ children }) {
  return (
    <div className="block min-h-screen w-full overflow-hidden">
      <MintingHeader />
      <main>{children}</main>
      <MintingFooter />
    </div>
  )
}
