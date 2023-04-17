import {
  CheckoutSection,
  ConnectSection,
  ReviewSection,
} from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useEffect, useState } from 'react'
import { useAccount, useContractEvent } from 'wagmi'
import useIsMounted from '@/hooks/useIsMounted'
import ContractAddress from '@/contracts/address.json'
import HalalanftABI from '@/contracts/Halalanft.json'

export default function MintingPage() {
  const isMounted = useIsMounted()
  const { isConnected, address } = useAccount({
    onDisconnect() {
      handleTab(1)
    },
  })
  const [activeTab, setActiveTab] = useState(isMounted && isConnected ? 2 : 1)
  const handleTab = (index) => setActiveTab(index)

  useContractEvent({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected && isMounted,
    eventName: 'Transfer',
    watch: true,
    listener: (from, to, tokenId) => {
      if (address === to) {
        setTokenBought((prevTokenIds) => [...prevTokenIds, tokenId.toNumber()])
      }
    },
  })

  return (
    <>
      <div className="bg h-full px-4 md:px-8">
        <div className="my-6 flex justify-center">
          <h1 className="font-impact text-[3rem] text-[#171717] opacity-[0.68]">
            Mint
          </h1>
        </div>

        <div className="mx-auto rounded-lg bg-white shadow-lg">
          <section className="justify-between md:flex md:flex-row">
            <div
              className={`flex justify-items-center space-x-4 max-sm:border-gray-100 px-8 py-8 max-sm:border-b-2 lg:px-14 ${
                activeTab === 1 ? 'border-b-2 border-blue-900' : ''
              }`}
            >
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <button
                    className="items-center self-center text-white"
                    type="button"
                  >
                    1
                  </button>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                  CONNECT
                </h1>
                <p className="text-slate-500">wallet and check network</p>
              </div>
            </div>
            <div
              className={`flex justify-items-center space-x-4 max-sm:border-gray-100 px-8 py-8 max-sm:border-b-2 lg:px-14 ${
                activeTab === 2 ? 'border-b-2 border-blue-900' : ''
              }`}
            >
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <button
                    className="items-center self-center text-white"
                    type="button"
                  >
                    2
                  </button>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                  CHECKOUT
                </h1>
                <p className="text-slate-500">quantity and mint</p>
              </div>
            </div>
            <div
              onClick={() => handleTab(3)}
              className={`flex justify-items-center space-x-4 max-sm:border-gray-100 px-8 py-8 max-sm:border-b-2 lg:px-14 ${
                activeTab === 3 ? 'border-b-2 border-blue-900' : ''
              }`}
            >
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <button
                    className="items-center self-center text-white"
                    type="button"
                  >
                    3
                  </button>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                  REVIEW
                </h1>
                <p className="text-slate-500">reciept</p>
              </div>
            </div>
          </section>
          <div className="hidden h-[0.5px] bg-[#171717] opacity-10 md:block"></div>
          <div>
            {activeTab === 1 && <ConnectSection handleTab={handleTab} />}
            {activeTab === 2 && <CheckoutSection handleTab={handleTab} />}
            {activeTab === 3 && tokenBought.length > 0 && (
              <ReviewSection tokenBought={tokenBought} handleTab={handleTab} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
