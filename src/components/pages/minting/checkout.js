import { Button } from '@/components/button'
import { useState, useEffect } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import ContractAddress from '@/contracts/address.json'
import HalalanftABI from '@/contracts/Halalanft.json'
import ERC20ABI from '@/contracts/erc20ABI.json'
import { useDebounce } from '@/utils/debounce'
import { ErrorPopup } from '@/components/modal'
import useIsMounted from '@/hooks/useIsMounted'
import { ethers } from 'ethers'

export default function CheckoutSection({ handleTab }) {
  const [amount, setAmount] = useState(0)
  const handleIncraseAmount = () => {
    setAmount(amount + 1)
  }
  const handleDecreaseAmount = () => {
    setAmount(amount - 1)
  }
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount({
    onDisconnect() {
      handleTab(1)
    },
    onConnect({ address, connector, isReconnected }) {
      !isMounted ? null : handleTab(2)
    },
  })

  const { data: currentPrice } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    watch: true,
    functionName: 'getCurrentPrice',
  })

  const [itemPrice, setItemPrice] = useState(2)
  useEffect(() => {
    const getItemPrice = async () => {
      const halalanft = await currentPrice
      isConnected &&
        halalanft &&
        setItemPrice(
          (
            parseFloat(ethers.utils.formatEther(currentPrice)) + 0.001
          ).toPrecision(2)
        )
    }
    getItemPrice()
  }, [isConnected, currentPrice])

  const { data: publicMinting } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'publicMintingEnabled',
    watch: true,
  })
  const debouncedMinting = useDebounce(publicMinting, 500)

  const { data: presaleAmount } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'getAux',
    args: [address],
    watch: true,
  })
  const debouncedPresaleAmount = useDebounce(presaleAmount?.toNumber(), 500)

  return (
    <>
      {isMounted && !isConnected ? (
        <section id="checkout" className="py-10 bg-red-100">
          <div className="flex justify-center">
            <p className="md:text-lg">Please connect to wallet first!</p>
          </div>
        </section>
      ) : (
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
                <button
                  onClick={handleDecreaseAmount}
                  className={`h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg ${
                    amount <= 0 && 'btn-disabled'
                  }`}
                >
                  -
                </button>
                <p className="text-[1.4rem] font-extrabold text-[#171717] opacity-[0.68] md:text-[1.8rem]">
                  {amount}
                </p>
                <button
                  onClick={handleIncraseAmount}
                  className={`h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg ${
                    amount >= 10 && 'btn-disabled'
                  }`}
                >
                  +
                </button>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  Cost per Token:
                </p>
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  {itemPrice}
                </p>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  Total Base Price:
                </p>
                <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
                  {itemPrice * amount}
                </p>
              </div>
              <hr />
              <div className="flex justify-end">
                <Button name="purchase" />
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
      )}
    </>
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
    args: [ContractAddress.USDC, parseInt(value) * 100],
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
      <Button
        className="w-full"
        disabled={!writeAsync || isLoading || isWriteLoading}
        onClick={async () => {
          await writeAsync().then(async () => {
            await refetchUsdcAllowance()
          })
        }}
      >
        {isLoading || isWriteLoading || status === 'loading'
          ? 'Loading...'
          : 'Approve'}
      </Button>
      {(isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isOpen}
          onClose={onErrorClose}
          title={'Unit Approval Error'}
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
      <Button
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
      </Button>
      {!!isMintingEnabled && (isPrepareError || isWriteError || isError) && (
        <ErrorPopup
          isOpen={isOpen}
          onClose={onErrorClose}
          title={'Unit Buying Error'}
        >
          There is an error while buying this. Please try again with the correct
          input.
        </ErrorPopup>
      )}
    </div>
  )
}
