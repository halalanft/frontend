import { ReviewSection } from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useAccount } from 'wagmi'
import useIsMounted from '@/hooks/useIsMounted'

export default function ReviewPage() {
  const { isConnected } = useAccount()
  const isMounted = useIsMounted
  return (
    <>
      <ReviewSection />
    </>
  )
}

ReviewPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
