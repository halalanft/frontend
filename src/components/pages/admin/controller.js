import { MintingHeader } from '@/components/header'
import HalalanftABI from '@/contracts/Halalanft.json'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Halalanft } from '@/utils/contract-address'
import { useGasCost } from '@/hooks/useGasCost'
import { ErrorPopup } from '@/components/modal'
import { toast } from 'react-hot-toast'
import useIsMounted from '@/hooks/useIsMounted'
import { useDebounce } from '@/utils/debounce'

export default function Controller() {
  const { address, isConnected } = useAccount()
  return (
    <div className="overflow-x-hidden">
      <MintingHeader />
      <div className="mx-auto mt-8 w-full rounded-lg bg-white p-8 shadow-xl md:w-2/3 lg:w-1/2">
        <div className="my-4 text-center text-2xl font-bold md:text-3xl">
          Controller
        </div>
        <hr className="mb-12" />
        {/* Enable/Disable Minting */}
        <div>
          <MintingEnabled isConnected={isConnected} />
        </div>
        {/* Airdrop */}
        <div>
          <Airdrop />
        </div>
        {/* Change Base URI */}
        <div>
          <ChangeBaseURIWallet isConnected={isConnected} address={address} />
        </div>
        {/* Change Onchain Wallet */}
        <div>{/* <ChangeOnchainWallet isConnected={isConnected} /> */}</div>
        {/* Change Offchain Wallet  */}
        <div>{/* <ChangeOffchainWallet isConnected={isConnected} /> */}</div>
        {/* Update Price */}
        <dv>
          <UpdatePrice isConnected={isConnected} />
        </dv>
      </div>
    </div>
  )
}

const MintingEnabled = ({ isConnected }) => {
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { data } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected && address === adminAddress,
    functionName: 'publicMintingEnabled',
    watch: true,
  })
  const debouncedMinting = useDebounce(data, 500)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    enabled: isMounted && !!isConnected && address === adminAddress,
    abi: HalalanftABI.abi,
    functionName: debouncedMinting
      ? 'disablePublicMinting'
      : 'enablePublicMinting',
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
          className={clsx(
            !(isMounted && debouncedMinting) ? 'text-blue-900' : 'text-red-500'
          )}
        >
          {isMounted && debouncedMinting ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <button
        className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
        disabled={!write || isLoading || isWriteLoading}
        onClick={async () => write()}
      >
        {isLoading || isWriteLoading
          ? 'Loading...'
          : isMounted && debouncedMinting
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

const Airdrop = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorOpened, setIsErrorOpened] = useState(true)
  const { isConnected, address } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const [values, setValues] = useState({
    to: '',
    amount: 1,
  })
  const debouncedMinting = useDebounce(values, 500)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'ownerMint',
    enabled:
      !!isConnected &&
      !!debouncedMinting.amount &&
      !!debouncedMinting.to &&
      address === adminAddress,
    args: [debouncedMinting.to, parseInt(debouncedMinting.amount)],
    onError(error) {
      setIsErrorOpened(true)
    },
  })
  const gasCost = useGasCost(config)
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite({
    ...config,
    overrides: {
      gasLimit: gasCost,
      gasPrice: gasCost,
    },
  })
  const {
    error: transactionError,
    isLoading,
    isError,
    status,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onError(error) {
      setIsErrorOpened(true)
    },
  })

  return (
    <div className="space-y-4">
      <label
        htmlFor="unit-price"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Airdrop
      </label>
      <div className="flex flex-row">
        <span className="mr-8 text-gray-700">To:</span>
        <input
          type="text"
          id="mint-to"
          disabled={isSubmitting}
          placeholder="0x0000000000000000000000000000000000000000"
          value={debouncedMinting.to}
          onChange={({ target }) =>
            setValues((prevValues) => ({
              ...prevValues,
              to: target.value,
            }))
          }
        />
      </div>
      <div className="flex flex-row">
        <span className="mr-8 text-gray-700">Amount</span>
        <input
          type="number"
          id="mint-amount"
          placeholder="10"
          disabled={isSubmitting}
          value={debouncedMinting.amount}
          onChange={({ target }) =>
            setValues((prevValues) => ({
              ...prevValues,
              amount: target.value,
            }))
          }
        />
      </div>
      <button
        className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
        disabled={!!writeAsync || isLoading || isWriteLoading}
        onClick={async () => handleMinting()}
      >
        {isLoading || isWriteLoading || status === 'loading'
          ? 'Loading...'
          : 'Buy'}
      </button>
      {(isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isErrorOpened}
          onClose={() => setIsErrorOpened(false)}
          title={'Unit Buying Error'}
        >
          There is an error while buying this. Please try again later.
        </ErrorPopup>
      )}
    </div>
  )
}

const ChangeBaseURIWallet = ({ isConnected, address }) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const isMounted = useIsMounted()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setBaseURI',
    enabled: isMounted && !!isConnected && address === adminAddress,
    args: [debouncedValue],
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

const ChangeOnchainWallet = ({ isConnected }) => {
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { data: dataOnchainWallet, isLoading: readOnchainWalletLoading } =
    useContractRead({
      address: Halalanft,
      abi: HalalanftABI.abi,
      enabled: !!isConnected && address === adminAddress,
      functionName: 'onchain',
      watch: true,
    })
  const [valueOnchainWallet, setValueOnchainWallet] = useState(
    isMounted ? dataOnchainWallet : '0x0000000000000000000000000000000000000000'
  )
  useEffect(() => {
    if (dataOnchainWallet) {
      setValueOnchainWallet(dataOnchainWallet)
    }
  }, [dataOnchainWallet])

  const {
    config,
    error: prepareOnchainWalletError,
    isError: isPrepareOnchainWalletError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setOnchainWallet',
    enabled: !!isConnected && isMounted,
    args: [valueOnchainWallet],
  })
  const {
    data: writeOnchainWalletData,
    error: writeOnchainWalletError,
    isError: isWriteOnchainWalletError,
    isLoading: isWriteOnchainWalletLoading,
    write: writeOnchainWallet,
  } = useContractWrite(config)
  const {
    error: onchainWalletError,
    isOnchainWalletLoading,
    isOnchainWalletError,
  } = useWaitForTransaction({
    hash: writeOnchainWalletData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="onchain-wallet"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Change Onchain Wallet
      </label>
      <div className="flex flex-row">
        <p>Current onchain wallet:</p>
        <p>{valueOnchainWallet}</p>
      </div>
      <input
        type="text"
        name="onchain-wallet"
        id="onchain-wallet"
        className="block w-full rounded-md border border-solid border-[#5BD3C7] p-2 pr-2 text-right outline-0 xl:pr-5"
        placeholder="0x8651H2h9K9k8056J81KhM96M6LJ3661640kK19lL"
        isDisabled={readOnchainWalletLoading}
        value={valueOnchainWallet}
        onChange={({ target }) => setValueOnchainWallet(target.value)}
      />
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          isDisabled={isOnchainWalletLoading || isWriteOnchainWalletLoading}
          onClick={async () => writeOnchainWallet()}
        >
          {isOnchainWalletLoading || isWriteOnchainWalletLoading
            ? 'Loading...'
            : 'Update'}
        </button>
      </div>
      {(isPrepareOnchainWalletError ||
        isWriteOnchainWalletError ||
        isOnchainWalletError) && (
        <span className="text-red-500">
          Error:{' '}
          {
            (
              prepareOnchainWalletError ||
              writeOnchainWalletError ||
              errorOnchainWallet
            )?.message
          }
        </span>
      )}
    </div>
  )
}

const ChangeOffchainWallet = ({ isConnected }) => {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const { data: dataOffchainWallet, isLoading: readOffchainWalletLoading } =
    useContractRead({
      address: Halalanft,
      abi: HalalanftABI.abi,
      enabled: !!isConnected && address === adminAddress,
      functionName: 'offchain',
      watch: true,
    })
  const [valueOffchainWallet, setValueOffchainWallet] = useState(
    isMounted
      ? dataOffchainWallet
      : '0x0000000000000000000000000000000000000000'
  )
  useEffect(() => {
    if (dataOffchainWallet) {
      setValueOffchainWallet(dataOffchainWallet)
    }
  }, [dataOffchainWallet])
  const {
    config,
    error: prepareOffchainWalletError,
    isError: isPrepareOffchainWalletError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setOffchainWallet',
    enabled: !!isConnected && isMounted,
    args: [valueOffchainWallet],
  })
  const {
    data: writeOffchainWalletData,
    error: writeOffchainWalletError,
    isError: isWriteOffchainWalletError,
    isLoading: isWriteOffchainWalletLoading,
    write: writeOffchainWallet,
  } = useContractWrite(config)
  const {
    error: OffchainWalletError,
    isOffchainWalletLoading,
    isOffchainWalletError,
  } = useWaitForTransaction({
    hash: writeOffchainWalletData?.hash,
  })

  return (
    <div className="my-4 space-y-4">
      <label
        htmlFor="offchain-wallet"
        className="text-lg font-semibold text-[#363755] md:text-2xl"
      >
        Change Offchain Wallet
      </label>
      <div className="flex flex-row">
        <p>Current offchain wallet:</p>
        <p>{valueOffchainWallet}</p>
      </div>
      <input
        type="text"
        name="offchain-wallet"
        id="offchain-wallet"
        className="block w-full rounded-md border border-solid border-[#5BD3C7] p-2 pr-2 text-right outline-0 xl:pr-5"
        placeholder="0x8651H2h9K9k8056J81KhM96M6LJ3661640kK19lL"
        isDisabled={readOffchainWalletLoading}
        value={valueOffchainWallet}
        onChange={({ target }) => setValueOffchainWallet(target.value)}
      />
      <div className="flex flex-row justify-end">
        <button
          className="w-full rounded-md bg-blue-900 py-2 px-4 text-white shadow-md xl:w-64"
          isDisabled={isOffchainWalletLoading || isWriteOffchainWalletLoading}
          onClick={async () => writeOffchainWallet()}
        >
          {isOffchainWalletLoading || isWriteOffchainWalletLoading
            ? 'Loading...'
            : 'Update'}
        </button>
      </div>
      {(isPrepareOffchainWalletError ||
        isWriteOffchainWalletError ||
        isOffchainWalletError) && (
        <span className="text-red-500">
          Error:{' '}
          {
            (
              prepareOffchainWalletError ||
              writeOffchainWalletError ||
              errorOffchainWallet
            )?.message
          }
        </span>
      )}
    </div>
  )
}

const UpdatePrice = ({ isConnected }) => {
  const { address } = useAccount()
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS
  const [value, setValue] = useState(1)

  const { data: dataUSD } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected && address === adminAddress,
    functionName: '_usdPrice',
    watch: true,
  })
  const [priceUSD, setPriceUSD] = useState(0)
  useEffect(() => {
    const getCost = async () => {
      const total = await dataUSD
      total && setPriceUSD(Number(BigInt(total) / BigInt(10 ** 8)))
    }
    getCost()
  }, [isConnected, dataUSD])

  const { data: dataETH } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected && address === adminAddress,
    functionName: 'getCurrentPrice',
    watch: true,
  })
  const [priceETH, setPriceETH] = useState(0)
  useEffect(() => {
    const getCost = async () => {
      const total = await dataETH
      total &&
        setPriceETH(
          Number((BigInt(total) * BigInt(100)) / BigInt(10 ** 18)) / 100
        )
    }
    getCost()
  }, [isConnected, dataETH])

  const debouncedValue = useDebounce(value, 500)
  const debouncedUSDPrice = useDebounce(priceUSD, 500)
  const debouncedETHPrice = useDebounce(priceETH, 500)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'setUSDPrice',
    args: [parseInt(debouncedValue)],
    enabled: Boolean(debouncedValue),
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
      <div className="flex flex-row">
        <p>Current USDC price:</p>
        <p>{debouncedUSDPrice}</p>
      </div>
      <div className="flex flex-row">
        <p>Current ETH price:</p>
        <p>{debouncedETHPrice}</p>
      </div>
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
