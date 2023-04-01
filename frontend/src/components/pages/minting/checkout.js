import React from 'react'
import { Button } from '@/components/button'
import Link from 'next/link'

export default function CheckoutSection() {
  return (
    <div className="bg overflow-hidden">
      <div className="px-8 ">
        <div className="my-6 flex justify-center">
          <h1 className="font-impact text-[3rem] text-[#171717] opacity-[0.68]">
            Mint
          </h1>
        </div>

        <div className="mx-auto h-[560px] rounded-lg bg-white shadow-lg ">
          <section className="flex justify-between">
            <div className="flex justify-items-center space-x-4 py-8 px-14">
              <div className="shrink-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#374C8C] p-2 shadow-lg">
                  <p className="items-center self-center text-white ">1</p>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68] ">
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
                <h1 className="text-xl font-semibold text-[#171717] opacity-[0.68]">
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

          <section id="checkout" className="py-10">
            <div className="flex flex-row justify-between px-14">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl text-[#FAD02C]">SELECT QUANTITY</h3>
                <h1 className="text-[2.5rem] font-bold text-[#171717] opacity-[0.68]">
                  How many?
                </h1>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-[1.4rem] text-[#171717] opacity-[0.68]">
                    Quantity (max: 10 per transaction)
                  </p>
                  <button className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg">
                    -
                  </button>
                  <p className="text-[1.8rem] font-extrabold text-[#171717] opacity-[0.68]">
                    0
                  </p>
                  <button className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg">
                    +
                  </button>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p className="text-[1.4rem] text-[#171717] opacity-[0.68]">
                    Cost per Token:
                  </p>
                  <p className="text-[1.4rem] text-[#171717] opacity-[0.68]">
                    0.025
                  </p>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p className="text-[1.4rem] text-[#171717] opacity-[0.68]">
                    Total Base Price:
                  </p>
                  <p className="text-[1.4rem] text-[#171717] opacity-[0.68]">
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
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
