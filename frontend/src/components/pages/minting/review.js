import React from 'react'
import Image from 'next/image'
import hero from '@/assets/images/concept_art_2.jpg'
import Link from 'next/link'
import { Button } from '@/components/button'

export default function ReviewSection() {
  return (
    <>
      <section id="review" className="py-10">
        <div className="flex flex-col justify-around px-14 md:flex-row md:gap-12 lg:gap-0">
          <div className="flex flex-col">
            <Image
              src={hero}
              alt="Hero"
              className="mb-4 w-56 rounded-lg border lg:w-80 lg:max-w-sm"
            />
          </div>

          <div className="flex flex-col space-y-2 lg:space-y-4">
            <p className="mb-8 text-[1.4rem] font-bold text-[#171717] opacity-[0.68]">
              Halalanft#3442
            </p>
            <p className="text-[1.4rem] italic text-[#171717] opacity-[0.68]">
              0 Optimistic Bunnies
            </p>
            <hr />
            <p className="text-[1.4rem] italic text-[#171717] opacity-[0.68]">
              0 Pixelated Bunnies
            </p>
            <hr />
            <p className="text-[1.4rem] italic text-[#171717] opacity-[0.68]">
              Specialized content in Discord server
            </p>
            <hr />
            <p className="text-[1.4rem] italic text-[#171717] opacity-[0.68]">
              Access to future airdrops
            </p>
            <Link href="/dashboard">
              <Button name="Go To Dashboard" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
