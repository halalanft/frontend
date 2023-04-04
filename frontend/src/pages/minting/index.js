import {
  CheckoutSection,
  ConnectSection,
  ReviewSection,
} from '@/components/pages/minting'
import { MintingLayout } from '@/components/layout'
import { useState } from 'react'

export default function MintingPage() {
  const [activeTab, setActiveTab] = useState(1)
  const handleClick = (index) => setActiveTab(index)
  const tabMenu = [
    {
      number: '1',
      title: 'CONNECT',
      description: 'wallet and check network',
    },
    {
      number: '2',
      title: 'CHECKOUT',
      description: 'quantity and mint',
    },
    {
      number: '3',
      title: 'REVIEW',
      description: 'reciept',
    },
  ]
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
              onClick={() => handleClick(1)}
              className={`flex cursor-pointer justify-items-center space-x-4 border-gray-100 px-8 py-8 hover:bg-sky-100 max-sm:border-b-2 lg:px-14 ${
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
              onClick={() => handleClick(2)}
              className={`flex cursor-pointer justify-items-center space-x-4 border-gray-100 px-8 py-8 hover:bg-sky-100 max-sm:border-b-2 lg:px-14 ${
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
              onClick={() => handleClick(3)}
              className={`flex cursor-pointer justify-items-center space-x-4 border-gray-100 px-8 py-8 hover:bg-sky-100 max-sm:border-b-2 lg:px-14 ${
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
            {activeTab === 1 && <ConnectSection />}
            {activeTab === 2 && <CheckoutSection />}
            {activeTab === 3 && <ReviewSection />}
          </div>
        </div>
      </div>
    </>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
