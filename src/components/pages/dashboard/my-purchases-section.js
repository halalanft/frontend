import { NFTCard } from '@/components/card'
import Button from '@/components/button'

import { useEffect, useState } from 'react'
import { useContractRead, useAccount } from 'wagmi'
import { useDebounce } from '@/utils/debounce'

export default function MyPurchasesSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        {/* Title */}
        <div className="flex font-semibold text-[#393E4B]">My purchases</div>
        {/* Control */}
        <div className="flex flex-row gap-4">
          <button type="button" className="rounded-full bg-[#EDEDED]"></button>
          <button type="button" className="rounded-full bg-[#EDEDED]"></button>
        </div>
      </div>
      {/* NFTs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4"></div>
    </div>
  )
}
