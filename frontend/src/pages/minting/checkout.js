import { CheckoutSection } from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useAccount } from 'wagmi'
import useIsMounted from '@/hooks/useIsMounted'

export default function CheckoutPage() {
  const { isConnected } = useAccount()
  const isMounted = useIsMounted
  return (
    <>
      <CheckoutSection />
    </>
  )
}

CheckoutPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
