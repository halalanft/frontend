import { MintingHeader } from '@/components/header'
import ContractAddress from '@/contracts/address.json'
import HalalanftABI from '@/contracts/Halalanft.json'
import ERC20ABI from '@/contracts/erc20ABI.json'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

export default function DashboardOwner() {
  const { address, isConnected } = useAccount()
  return (
    <div className="overflow-x-hidden">
      <MintingHeader />
      <div className="mx-auto mt-8 w-full rounded-lg bg-white p-8 shadow-xl md:w-2/3 lg:w-1/2">
        <div className="my-4 text-center text-2xl font-bold md:text-3xl">
          Dashboard Owner
        </div>
        <hr className="mb-12" />
        {/* Enable/Disable Minting */}
        <div>
          <MintingEnabled isConnected={isConnected} />
        </div>
        {/* Auto Distribution */}
        <div>
          <AutoDistribution isConnected={isConnected} />
        </div>
        {/* Change Base URI */}
        <div>
          <ChangeBaseURIWallet isConnected={isConnected} address={address} />
        </div>
        {/* Change Treasury Wallet */}
        <div>
          <ChangeTreasuryWallet isConnected={isConnected} />
        </div>
        {/* Withdraw */}
        <div>
          <Withdraw />
        </div>
        {/* Update Price */}
        <dv>
          <UpdatePrice isConnected={isConnected} />
        </dv>
      </div>
    </div>
  )
}

const MintingEnabled = ({ isConnected }) => {
  const { data } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'mintingEnabled',
    watch: true,
  })
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: data ? 'disableMinting' : 'enableMinting',
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="unit-price"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Enable/Disable Minting
      </label>
      <div className="flex flex-row">
        <span className="mr-8 text-gray-700">Minting Status:</span>
        <span
          className={clsx(data && 'text-[##5BD3C7]', !data && 'text-red-500')}
        >
          {data ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <button
        className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
        disabled={!write || isLoading || isWriteLoading}
        onClick={async () => write()}
      >
        {isLoading || isWriteLoading
          ? 'Loading...'
          : data
          ? 'Disable'
          : 'Enable'}
      </button>
      {(isPrepareError || isWriteError || isError) && (
        <span className="text-red-500">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

const AutoDistribution = ({ isConnected }) => {
  const { data } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'autoDistribute',
    watch: true,
  })
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setAutoDistribute',
    args: [!data],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="space-y-4">
      <label
        htmlFor="unit-price"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Enable/Disable Auto Distribution
      </label>
      <div className="flex flex-row">
        <span className="mr-8 text-gray-700">Auto Distribution Status:</span>
        <span
          className={clsx(data && 'text-[#5BD3C7]', !data && 'text-red-500')}
        >
          {data ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <button
        className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
        disabled={!write || isLoading || isWriteLoading}
        onClick={async () => write()}
      >
        {isLoading || isWriteLoading
          ? 'Loading...'
          : data
          ? 'Disable'
          : 'Enable'}
      </button>
      {(isPrepareError || isWriteError || isError) && (
        <span className="text-red-500">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

const ChangeBaseURIWallet = ({ isConnected, address }) => {
  const { data: token, isSuccess } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'getIDsByOwner',
    args: [address],
    watch: true,
  })

  const { data } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: isSuccess,
    functionName: 'tokenURI',
    args: [token?.[0]],
    watch: true,
  })

  const [value, setValue] = useState('')
  useEffect(() => {
    if (data) {
      let parsedURL = new URL(data)
      setValue(`${parsedURL.origin}/`)
    }
  }, [data])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setBaseURI',
    args: [value],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="base-uri-wallet"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Change Base URI
      </label>
      <input
        type="text"
        name="base-uri-wallet"
        id="base-uri-wallet"
        className="block w-full rounded-md border border-solid border-[#5BD3C7] p-2 pr-2 text-right outline-0 xl:pr-5"
        placeholder="https://halalanft.com"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          disabled={!write || isLoading || isWriteLoading}
          onClick={async () => write()}
        >
          {isLoading || isWriteLoading ? 'Loading...' : 'Update'}
        </button>
      </div>
      {(isPrepareError || isWriteError || isError) && (
        <span className="text-red-500">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

const ChangeTreasuryWallet = ({ isConnected }) => {
  const { data } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'teamWallet',
    watch: true,
  })
  const [value, setValue] = useState(data || '')
  useEffect(() => {
    if (data) {
      setValue(data)
    }
  }, [data])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setTeamWallet',
    args: [value],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="treasury-wallet"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Change Treasury Wallet
      </label>
      <input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        className="block w-full rounded-md border border-solid border-[#5BD3C7] p-2 pr-2 text-right outline-0 xl:pr-5"
        placeholder="0x8651H2h9K9k8056J81KhM96M6LJ3661640kK19lL"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          disabled={isLoading || isWriteLoading}
          onClick={async () => write()}
        >
          {isLoading || isWriteLoading ? 'Loading...' : 'Update'}
        </button>
      </div>
      {(isPrepareError || isWriteError || isError) && (
        <span className="text-red-500">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

const Withdraw = () => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'withdrawToken',
    args: [ContractAddress.USDC],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="withdraw-payment"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Withdraw Payment
      </label>
      <div className="flex flex-row justify-between">
        <span className="text-[#363755]">Current contract wallet:</span>
        <span className="font-bold text-[#363755]">USDC 1,000,000</span>
      </div>
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          disabled={!write || isLoading || isWriteLoading}
          onClick={async () => write()}
        >
          {isLoading || isWriteLoading ? 'Loading...' : 'Withdraw'}
        </button>
        {(isPrepareError || isWriteError || isError) && (
          <span className="text-red-500">
            Error: {(prepareError || writeError || error)?.message}
          </span>
        )}
      </div>
    </div>
  )
}

const UpdatePrice = ({ isConnected }) => {
  const { data } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'cost',
    watch: true,
  })
  const [value, setValue] = useState(data || 0)
  useEffect(() => {
    if (data) {
      setValue(data)
    }
  }, [data])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setCost',
    args: [value],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="unit-price"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Update Unit Price
      </label>
      <input
        type="number"
        name="price"
        id="price"
        className="block w-full rounded-md border border-solid border-[#5BD3C7] p-2 pr-2 text-right outline-0 xl:pr-5"
        placeholder="1"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          disabled={!write || isLoading || isWriteLoading}
          onClick={async () => write()}
        >
          {isLoading || isWriteLoading ? 'Loading...' : 'Update'}
        </button>
        {(isPrepareError || isWriteError || isError) && (
          <span className="text-red-500">
            Error: {(prepareError || writeError || error)?.message}
          </span>
        )}
      </div>
    </div>
  )
}
