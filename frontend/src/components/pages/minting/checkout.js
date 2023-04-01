import React from 'react'
import { Button } from '@/components/button'
import Link from 'next/link'

export default function CheckoutSection() {
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

        <section id="checkout" className="py-10">
          <div className="flex flex-col px-6 md:flex-row md:justify-between md:gap-14 md:px-8 lg:gap-0 lg:px-14">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg text-[#FAD02C] md:text-xl">
                SELECT QUANTITY
              </h3>
              <h1 className="text-[1.8rem] font-bold text-[#171717] opacity-[0.68] md:text-[2.5rem]">
                How many?
              </h1>
              <div className="flex flex-row items-center space-x-4">
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  Quantity (max: 10 per transaction)
                </p>
                <button className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg">
                  -
                </button>
                <p className="text-[1.4rem] font-extrabold text-[#171717] opacity-[0.68] md:text-[1.8rem]">
                  0
                </p>
                <button className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg">
                  +
                </button>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  Cost per Token:
                </p>
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  0.025
                </p>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  Total Base Price:
                </p>
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  0.000
                </p>
              </div>
              <hr />
              <div className="flex justify-end">
                <Link href="/minting/pages/review">
                  <Button name="purchase" />
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <p className="text-[1rem] italic text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                0 Optimistic Bunnies
              </p>
              <hr />
              <p className="text-[1rem] italic text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                0 Pixelated Bunnies
              </p>
              <hr />
              <p className="text-[1rem] italic text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                Specialized content in Discord server
              </p>
              <hr />
              <p className="text-[1rem] italic text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                Access to future airdrops
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}