import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export default function ConnectSection() {
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
          <p className="md:px-18 mx-auto px-6 py-6 text-left leading-loose  text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
            Connect your MetaMask wallet and add the Optimism Network to start.
          </p>
          <div className="mb-4 flex justify-center">
            <ConnectButton />
          </div>
          <p className="md:px-18 mx-auto px-6 py-6 text-left leading-loose text-[#171717] opacity-[0.68] md:w-3/4 md:text-center lg:px-32">
            You will need to have Ether on the Optimism network to mint the NFT.
            Please go to the official Optimism GatewayorHop exchange to move
            some Ether to the Optimism network before you begin.
          </p>
        </div>
      </section>
    </>
  )
}
