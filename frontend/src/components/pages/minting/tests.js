import { ButtonMint } from '@/components/button'
import { ErrorPopup } from '@/components/modal'
import HalalanftABI from '@/contracts/Halalanft.json'
import ContractAddress from '@/contracts/address.json'
import { useDebounce } from '@/utils/debounce'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import ERC20ABI from '@/contracts/erc20ABI.json'
import Image from 'next/image'
import NFT from '@/assets/images/concept_art_2.jpg'

export default function MintingSection() {
  const [isErrorOpened, setIsErrorOpened] = useState(true)

  const { isConnected, address } = useAccount({
    onDisconnect() {
      if (window) {
        window.sessionStorage.clear()
      }
    },
  })
  // Form data
  const [value, setValue] = useState(1)
  const [approved, setApproved] = useState(false)
  useEffect(() => {
    if (window) {
      setApproved(window.sessionStorage.getItem(address))
    }
  }, [approved, address, value])

  useContractEvent({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    eventName: 'Approval',
    listener: (owner, spender, value) => {
      setApproved(value)
      if (window) {
        window.sessionStorage.setItem(owner, value)
      }
    },
  })

  const { data: halalanftCost } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'cost',
    watch: true,
  })
  const debouncedCost = useDebounce(halalanftCost, 500)

  const { data: maxSupply } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'MAX_SUPPLY',
    watch: true,
  })
  const debouncedMaxSupply = useDebounce(maxSupply, 500)

  const { data: totalSupply } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'totalSupply',
    watch: true,
  })
  const debouncedTotalSupply = useDebounce(totalSupply, 500)

  const { data: isMintingEnabled } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'mintingEnabled',
  })
  const debouncedMinting = useDebounce(isMintingEnabled, 500)

  const { data: usdcAllowance, refetch: refetchUsdcAllowance } =
    useContractRead({
      address: ContractAddress.USDC,
      abi: ERC20ABI,
      enabled: !!isConnected,
      functionName: 'allowance',
      args: [address, ContractAddress.Halalanft],
      onError(error) {
        setIsErrorOpened(true)
      },
    })
  const debouncedAllowance = useDebounce(usdcAllowance, 500)
  return (
    <div className="bg-slate-900">
      <div className="text-2xl font-bold text-[#2DD4BF] md:text-3xl">
        Unit <span className="text-[#fff]">NFT</span>
      </div>
      <div className="gap-4 p-4 md:flex md:flex-row">
        <div className="md:w-1/2">
          <Image src={NFT} alt="NFT" width={200} />
        </div>

        <div className="flex flex-col justify-between gap-4 text-[#fff] md:w-1/2">
          <p className="text-2xl font-semibold">Description:</p>
          <p className="md:text-lg">
            Villa is one of the Soonan Tsoor premium unit that is not
            fractionalized. The holder will get the previlige to stay whenever
            they want.
          </p>
          <div className="flex gap-4 ">
            <div className="text-white md:text-lg">
              <p>Current Price</p>
              <p className="font-semibold md:text-lg">
                USDC {parseFloat(debouncedCost) / 1_000_000 || 0}
              </p>
            </div>
            <div className="text-[#5BD3C7] md:text-lg">
              <p>Sold</p>
              <p>
                {parseFloat(debouncedTotalSupply)}/
                {parseFloat(debouncedMaxSupply)}
              </p>
            </div>
          </div>
          <div>
            <h1 className="mx-auto mb-2 text-xl font-bold lg:w-[50rem]">
              Amount (Max. 5)
            </h1>
            {/* Disable until approve success */}
            <input
              type="number"
              className="md:50px mx-auto flex w-full appearance-none rounded-md border border-solid border-[#5BD3C7] bg-white p-4 text-right text-black md:text-lg"
              placeholder="Min 25% 50% Max"
              value={value}
              disabled={!(approved && debouncedMinting)}
              min="1"
              max="5"
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
          <>
            {approved || !isMintingEnabled ? (
              <BuyButton
                isConnected={isConnected}
                value={value}
                isOpen={isErrorOpened}
                onErrorOpen={setIsErrorOpened}
                isMintingEnabled={debouncedMinting}
                onErrorClose={() => setIsErrorOpened(false)}
                usdcAllowance={debouncedAllowance}
                costHalalanft={debouncedCost}
                setApproved={setApproved}
                approved={approved}
              />
            ) : (
              <ApproveButton
                isConnected={isConnected}
                value={debouncedCost}
                isOpen={isErrorOpened}
                onErrorOpen={setIsErrorOpened}
                onApproved={() => setApproved(true)}
                onErrorClose={() => setIsErrorOpened(false)}
                refetchUsdcAllowance={refetchUsdcAllowance}
              />
            )}
          </>
        </div>
      </div>
    </div>
  )
}

const ApproveButton = ({
  isConnected,
  value,
  onApproved,
  isOpen,
  onErrorOpen,
  onErrorClose,
  refetchUsdcAllowance,
}) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    functionName: 'approve',
    enabled: !!isConnected && Boolean(value),
    args: [ContractAddress.Halalanft, parseInt(value) * 100],
    onError(error) {
      onErrorOpen(true)
    },
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isSuccess: isWriteSuccess,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite(config)
  const { error, isLoading, isError, status } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="flex flex-col gap-4">
      <ButtonMint
        className="w-full"
        disabled={!writeAsync || isLoading || isWriteLoading}
        onClick={async () => {
          await writeAsync().then(() => {
            onApproved()
          })
          await refetchUsdcAllowance()
        }}
      >
        {isLoading || isWriteLoading || status === 'loading'
          ? 'Loading...'
          : 'Approve'}
      </ButtonMint>
      {(isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isOpen}
          onClose={onErrorClose}
          title={'Unit Villa Approval Error'}
        >
          There is an error while approving this. Please try again later.
        </ErrorPopup>
      )}
    </div>
  )
}

const BuyButton = ({
  isConnected,
  value,
  isMintingEnabled,
  isOpen,
  onErrorOpen,
  onErrorClose,
  usdcAllowance,
  costHalalanft,
  approved,
  setApproved,
}) => {
  const debouncedValue = useDebounce(value, 500)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'mint',
    enabled:
      !!isConnected &&
      Boolean(debouncedValue) &&
      !!approved &&
      !!isMintingEnabled &&
      parseInt(usdcAllowance) >= parseInt(costHalalanft),
    args: [parseInt(debouncedValue)],
    onError(error) {
      if (parseInt(usdcAllowance) < parseFloat(costHalalanft)) {
        setApproved(false)
        window.sessionStorage.clear()
      }

      onErrorOpen(false)
    },
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite(config)
  const { error, isLoading, isError, status } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="flex flex-col gap-4">
      <ButtonMint
        className="w-full"
        variant={!!isMintingEnabled ? 'enabled' : 'disabled'}
        disabled={
          !writeAsync || isLoading || isWriteLoading || !isMintingEnabled
        }
        onClick={async () => {
          await writeAsync().then(() => {
            if (usdcAllowance?.toNumber() < parseFloat(costHalalanft)) {
              setApproved(false)
            }
          })
        }}
      >
        {isLoading || isWriteLoading || status === 'loading'
          ? 'Loading...'
          : !!isMintingEnabled
          ? 'Buy'
          : 'Minting Disabled'}
      </ButtonMint>
      {!!isMintingEnabled && (isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isOpen}
          onClose={onErrorClose}
          title={'Unit Villa Buying Error'}
        >
          There is an error while buying this. Please try again with the correct
          input.
        </ErrorPopup>
      )}
    </div>
  )
}
