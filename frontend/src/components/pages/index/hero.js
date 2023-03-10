import hero from '@/assets/images/concept_art_2.png'
import { Button, ButtonHome } from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className=" bg-white">
      <div className="layer w-screen bg-gradient-to-t from-[rgba(250,208,44,0.92)] to-[rgba(250,208,44,0)] px-8 py-16  ">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-12 text-center lg:mb-0 lg:text-left">
            <h1 className="mt-4 font-impact text-5xl text-[#171717] opacity-[0.68] lg:mt-0 lg:text-7xl ">
              The First Halal <br />
              NFTs Collection
            </h1>
            <p className="py-6 font-semibold text-[#171717] opacity-[0.68]">
              That Brings Sharia Based DeFi Ecosystem.
            </p>
            <div className="flex flex-col gap-6 md:flex-row">
              <ButtonHome name="Download Whitepaper" />
              <Link href="/minting">
                <Button name="Mint Now" />
              </Link>
            </div>
          </div>
          <Image
            src={hero}
            alt="Hero"
            className="w-80 rounded-lg opacity-50 lg:w-96 lg:max-w-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
