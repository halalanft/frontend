import React from 'react'
import Image from 'next/image'
import hero from '@/assets/images/concept_art_2.jpg'

export default function ReviewSection() {
  return (
    <div className="bg overflow-hidden">
      <div className="px-8">
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

          <section id="review" className="py-10">
            <div className="flex flex-row justify-around px-14">
              <div className="flex flex-col ">
                <Image
                  src={hero}
                  alt="Hero"
                  className="w-56 rounded-lg border lg:w-80 lg:max-w-sm"
                />
              </div>

              <div className="flex flex-col space-y-4">
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
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
