import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { utils } from 'ethers'

export default function SendTransaction() {
  const [to, setTo] = React.useState('')
  const [amount, setAmount] = useState('')
  const [debouncedTo] = useDebounce(to, 500)
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  })

  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendTransaction?.()
        }}
      >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              aria-label="address"
              onChange={(e) => setTo(e.target.value)}
              placeholder="0xA0Cf…251e"
              value={to}
            />
          </div>
          <div>
            <label
              for="amount"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Amount
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              aria-label="Amount (ether)"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.05"
              value={amount}
            />
          </div>
        </div>

        <button
          className="bg-blue-800 p-4 text-white rounded-xl shadow-lg"
          disabled={!sendTransaction || !to || !amount}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        {isSuccess && (
          <div className="text-gray-900">
            Successfully sent {amount} ether to {to}
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
