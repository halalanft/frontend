import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { useState, useEffect } from 'react'

export default function NFTDetailSection() {
  return (
    <>
      <div>
        <div>
          <h2 className="mb-3 text-xl font-semibold text-[#393E4B]">NFT</h2>
        </div>

        <div className="space-y-4">
          <div className="mx-auto flex items-center space-x-4 rounded-xl bg-[rgba(146,210,183,0.2)] bg-gradient-to-tl from-[rgba(0,0,0,0%)] to-white p-3 shadow-lg">
            <div className="space-y-2 p-1">
              <p className="font-bold text-slate-500">Current Ownership</p>
              <p className=" text-slate-500">100/1000 (10%)</p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold">Detail</h2>
          </div>

          <div className="flex flex-auto items-center justify-between font-semibold text-[#393E4B]">
            <div>
              <div className="my-6">
                <p className="text-lg font-semibold">My Title</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg font-semibold">10</p>
              <p className="text-lg font-semibold">On Sale</p>
              <p className="text-lg font-semibold">USDC 1</p>
              <p className="text-lg font-semibold">USDC 1</p>
              <p className="text-lg font-semibold">USDC 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
