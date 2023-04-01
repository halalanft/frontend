import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import CheckoutSection from './checkout'

export default function ConnectSection() {
  const { isConnected } = useAccount()

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
          <section className="md:flex md:justify-between">
            {tabMenu.map(({ number, title, description }) => (
              <div
                key={number}
                className="flex justify-items-center space-x-4 border-gray-100 py-8 px-8 max-sm:border-b-2 lg:px-14"
              >
                <div className="shrink-0">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                    <p className="items-center self-center text-white">
                      {number}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                    {title}
                  </h1>
                  <p className="text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </section>
          <div className="hidden h-[2px] bg-[#171717] opacity-30 md:block"></div>

          <section id="connect" className="py-10">
            <div>
              <h3 className="text-center text-lg text-[#FAD02C] md:text-xl">
                HALALANFT MINTING
              </h3>
              <h1 className="text-center text-[1.8rem] font-bold text-[#171717] opacity-[0.68] md:text-[2.5rem]">
                Are you ready?
              </h1>
              <p className="md:px-18 mx-auto py-6 px-6 text-left leading-loose  text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
                Connect your MetaMask wallet and add the Optimism Network to
                start.
              </p>
              <div className="mb-4 flex justify-center">
                <ConnectButton />
              </div>
              <p className="md:px-18 mx-auto py-6 px-6 text-left leading-loose text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
                You will need to have Ether on the Optimism network to mint the
                NFT. Please go to the official Optimism GatewayorHop exchange to
                move some Ether to the Optimism network before you begin.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
