import { Button } from '@/components/button'
import { useState, useEffect } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import HalalanftABI from '@/contracts/Halalanft.json'
import { useDebounce } from '@/utils/debounce'
import { ErrorPopup } from '@/components/modal'
import useIsMounted from '@/hooks/useIsMounted'
import { ethers } from 'ethers'
import { Halalanft } from '@/utils/contract-address'
import { getProof } from '@/utils/merkletree'

export default function CheckoutSection({ handleTab }) {
  const [amount, setAmount] = useState(0)
  const [finalAmount, setFinalAmount] = useState(0)
  const handleIncreaseAmount = () => {
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
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    watch: true,
    functionName: 'getCurrentPrice',
  })

  const [itemPrice, setItemPrice] = useState(0)
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
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'publicMintingEnabled',
    watch: true,
  })
  const debouncedMinting = useDebounce(publicMinting, 500)

  const { data: presaleAmount } = useContractRead({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'getAux',
    args: [address],
    watch: true,
  })
  const debouncedPresaleAmount = useDebounce(presaleAmount?.toNumber(), 500)

  return (
    <>
      <section id="checkout" className="py-10">
        <div className="flex flex-col px-6 md:flex-row md:justify-between md:gap-14 md:px-8 lg:gap-0 lg:px-14">
          <div className="flex flex-col space-y-2">
            {debouncedPresaleAmount > 0 ? (
              <PresaleHeader
                isConnected
                presaleAmount={debouncedPresaleAmount}
                setFinalAmount={setFinalAmount}
              />
            ) : (
              <PublicHeader
                isConnected
                debouncedMinting={debouncedMinting}
                amount={amount}
                handleDecreaseAmount={handleDecreaseAmount}
                handleIncreaseAmount={handleIncreaseAmount}
              />
            )}
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
              {debouncedPresaleAmount > 0 ? (
                <PresaleButton
                  finalAmount={finalAmount}
                  handleTab={handleTab}
                  ether={ethers.utils.parseEther(
                    (finalAmount * itemPrice).toString()
                  )}
                  isConnected
                  isMounted={isMounted}
                />
              ) : (
                <PublicMintButton
                  isConnected
                  handleTab={handleTab}
                  debouncedMinting={debouncedMinting}
                  finalAmount={finalAmount}
                  ether={ethers.utils.parseEther(
                    (finalAmount * itemPrice).toString()
                  )}
                  isMounted={isMounted}
                />
              )}
            </div>
          </div>
          {/* Benefit */}
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
    </>
  )
}

const PresaleButton = ({
  isMounted,
  isChecked,
  isConnected,
  finalAmount,
  handleTab,
  ether,
}) => {
  const { address } = useAccount()
  const proof = getProof(address)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'presale',
    enabled: ether > 0 && isMounted && !!isConnected,
    overrides: {
      value: ether,
    },
    args: [finalAmount, proof],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
    onSettled(data, error) {
      error ? null : handleTab(3)
    },
    onSuccess(data) {
      handleTab(3)
    },
  })
  return (
    <>
      <button
        className={'btn rounded-md bg-[#374C8C] font-bold text-white shadow-lg'}
        disabled={!isConnected}
        onClick={async () => mintNFT()}
      >
        Presale
      </button>
    </>
  )
}

const PresaleHeader = ({
  amount,
  presaleAmount,
  handleDecreaseAmount,
  handleIncreaseAmount,
  setAmount,
  setFinalAmount,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg text-[#FAD02C] md:text-xl">SELECT QUANTITY</h3>
        <h1 className="text-[1.8rem] font-bold text-[#171717] opacity-[0.68] md:text-[2.5rem]">
          Your presale amount
        </h1>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
            Quantity (max: {presaleAmount} per transaction)
          </p>
          <button
            onClick={handleDecreaseAmount}
            className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg"
            disabled={presaleAmount <= 0}
          >
            -
          </button>
          <p className="text-[1.4rem] font-extrabold text-[#171717] opacity-[0.68] md:text-[1.8rem]">
            {presaleAmount}
          </p>
          <button
            onClick={handleIncreaseAmount}
            className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg"
            disabled={presaleAmount >= 10}
          >
            +
          </button>
        </div>
      </div>
    </>
  )
}

const PublicMintButton = ({
  isChecked,
  debouncedMinting,
  isConnected,
  finalAmount,
  isMounted,
  handleTab,
  ether,
}) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'publicMint',
    enabled: ether > 0 && isMounted && !!isConnected && debouncedMinting,
    overrides: {
      value: ether,
    },
    args: [finalAmount],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    write: mintNFT,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
    onSettled(data, error) {
      error ? null : handleTab(3)
    },
    onSuccess(data) {
      handleTab(3)
    },
  })

  return (
    <>
      <button
        className={'btn rounded-md bg-[#374C8C] font-bold text-white shadow-lg'}
        disabled={!(isConnected && debouncedMinting)}
        onClick={async () => mintNFT()}
      >
        {debouncedMinting ? 'Purchase' : 'Minting Disabled'}
      </button>
    </>
  )
}

const PublicHeader = ({
  handleIncreaseAmount,
  handleDecreaseAmount,
  amount,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg text-[#FAD02C] md:text-xl">SELECT QUANTITY</h3>
        <h1 className="text-[1.8rem] font-bold text-[#171717] opacity-[0.68] md:text-[2.5rem]">
          How many?
        </h1>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-[1rem] text-[#171717] opacity-[0.68] md:text-[1.4rem]">
            Quantity (max: 10 per transaction)
          </p>
          <button
            onClick={handleDecreaseAmount}
            className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg"
            disabled={amount <= 0}
          >
            -
          </button>
          <p className="text-[1.4rem] font-extrabold text-[#171717] opacity-[0.68] md:text-[1.8rem]">
            {amount}
          </p>
          <button
            onClick={handleIncreaseAmount}
            className="h-10 w-10 rounded-md bg-[#374C8C] font-bold text-white shadow-lg"
            disabled={amount >= 10}
          >
            +
          </button>
        </div>
      </div>
    </>
  )
}
