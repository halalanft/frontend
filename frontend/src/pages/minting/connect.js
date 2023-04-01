import { ConnectSection } from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useAccount } from 'wagmi'
import useIsMounted from '@/hooks/useIsMounted'

export default function ConnectPage() {
  const { isConnected } = useAccount()
  const isMounted = useIsMounted
  return (
    <>
      <ConnectSection />
    </>
  )
}

ConnectPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
