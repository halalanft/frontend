import React from 'react'
import Image from 'next/image'
import hero from '@/assets/images/concept_art_2.jpg'
import Link from 'next/link'
import { Button } from '@/components/button'

export default function ReviewSection() {
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
              className="flex justify-items-center space-x-4 border-gray-100 px-8 py-8 max-sm:border-b-2 lg:px-14"
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
      </div>
    </div>
  )
}
