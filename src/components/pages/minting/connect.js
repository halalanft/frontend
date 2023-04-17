import { ConnectButton } from '@rainbow-me/rainbowkit'
import useIsMounted from '@/hooks/useIsMounted'
import { useAccount, useNetwork } from 'wagmi'
import { useDebounce } from '@/utils/debounce'
import { useState, useEffect } from 'react'

export default function ConnectSection({ handleTab }) {
  const isMounted = useIsMounted()
  const { chains, chain } = useNetwork()
  const { address, isConnected } = useAccount({
    onDisconnect() {
      handleTab(1)
    },
    onConnect({ address, connector, isReconnected }) {
      isMounted && isWrongNetwork ? null : handleTab(2)
    },
  })

  // Check if the user is in the correct network
  const supportedChains = chains.map(({ id }) => id)
  const [isWrongNetwork, setIsWrongNetwork] = useState(
    !supportedChains.includes(chain?.id)
  )

  useEffect(() => {
    setIsWrongNetwork(!supportedChains.includes(chain?.id))
  }, [supportedChains, chain])

  useEffect(() => {
    isMounted && isConnected ? handleTab(2) : null
  }, [isConnected, handleTab, isMounted])

  // Get the balance
  const debouncedAddress = useDebounce(address, 500)

  return (
    <>
      <section id="connect" className="py-10">
        <div>
          <h3 className="text-center text-lg text-[#FAD02C] md:text-xl">
            HALALANFT MINTING
          </h3>
          <h1 className="text-center text-[1.8rem] font-bold text-[#171717] opacity-[0.68] md:text-[2.5rem]">
            Are you ready?
          </h1>
          {!!isWrongNetwork && isMounted ? (
            <p className="md:px-18 mx-auto px-6 py-6 text-left leading-loose text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
              Connect your MetaMask wallet and add the Optimism Network to
              start.
            </p>
          ) : (
            <p className="md:px-18 mx-auto px-6 py-6 text-left leading-loose text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
              You are in the wrong network
            </p>
          )}

          <div className="mb-4 flex justify-center">
            <ConnectButton />
          </div>
          <p className="md:px-18 mx-auto px-6 py-6 text-left leading-loose text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
            You will need to have Ether on the Fuji network to mint the NFT.
          </p>
        </div>
      </section>
    </>
  )
}
