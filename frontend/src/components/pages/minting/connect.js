import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export default function ConnectSection() {
  const { isConnected } = useAccount()
  return (
    <>
      <div className="bg px-8">
        <div className="my-6 flex justify-center">
          <h1 className="font-impact text-[3rem] text-[#171717] opacity-[0.68]">
            Mint
          </h1>
        </div>

        <div className="mx-auto h-[560px] rounded-lg bg-white shadow-lg ">
          <section className="flex justify-between">
            <div className="flex justify-items-center space-x-4 py-8  px-14">
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <p className="items-center self-center text-white">1</p>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
                  CONNECT
                </h1>
                <p className="text-slate-500">wallet and check network</p>
              </div>
            </div>
            <div className="flex justify-items-center space-x-4 py-8 px-14">
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <p className="items-center self-center text-white ">2</p>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68] ">
                  CHECKOUT
                </h1>
                <p className="text-slate-500">quantity and mint</p>
              </div>
            </div>
            <div className="flex justify-items-center space-x-4 py-8 px-14">
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <p className="items-center self-center text-white ">3</p>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68] ">
                  REVIEW
                </h1>
                <p className="text-slate-500">reciept</p>
              </div>
            </div>
          </section>
          <div className="h-[2px] bg-[#171717] opacity-30"></div>
          <section id="connect" className="py-10">
            <div className="text-center">
              <h3 className="text-xl text-[#FAD02C]">HALALANFT MINTING</h3>
              <h1 className="text-[2.5rem] font-bold text-[#171717] opacity-[0.68]">
                Are you ready?
              </h1>
              <p className="mx-auto w-3/4 px-32 py-6  text-[#171717] opacity-[0.68]">
                Connect your MetaMask wallet and add the Optimism Network to
                start.
              </p>
              <div className="mb-4 flex justify-center">
                <ConnectButton />
              </div>
              <p className="mx-auto w-3/4 px-32 py-6 leading-loose text-[#171717] opacity-[0.68]">
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
