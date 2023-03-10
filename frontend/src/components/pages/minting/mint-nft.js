import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useNumberInput, Button } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { getAddress } from 'ethers/lib/utils.js'
import ContractAddress from '@/contracts/address.json'
import HalalanftABI from '@/contracts/Halalanft.json'
import ERC20ABI from '@/contracts/erc20ABI.json'
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
  useAccount,
} from 'wagmi'
import { Field, Form, Formik } from 'formik'

export default function MintNFT() {
  const nftPrice = 1000000000
  const { connector, isConnected, address } = useAccount()
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      max: 10,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  // Minting Enable
  const { data: mintingEnabled } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'mintingEnabled',
  })

  // BalanceOf USDC
  const { data: balanceOfUSDC } = useContractRead({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    enabled: !!isConnected,
    args: [address],
    onError(error) {
      console.log('Error Balance USDC', error)
    },
  })
  const { data: balanceOf } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'balanceOf',
    enabled: !!isConnected,
    args: [address],
    onError(error) {
      console.log('Error Balance Halalanft', error)
    },
  })
  const {
    config: configUSDC,
    error: prepareUSDCError,
    isError: isPrepareUSDCError,
  } = usePrepareContractWrite({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [getAddress(ContractAddress.Halalanft), BigNumber.from(nftPrice)],
    enabled: !!isConnected,
    onError(error) {
      console.log('Error Prepare USDC', error)
    },
  })
  const {
    data: dataUSDC,
    error: errorUSDC,
    isError: isUSDCError,
    write: writeUSDC,
  } = useContractWrite(configUSDC)

  const {
    isLoading: isLoadingTransactionUSDC,
    isSuccess: isSuccessTransactionUSDC,
  } = useWaitForTransaction({
    hash: dataUSDC?.hash,
  })

  // Approval
  const [approval, setApproval] = useState('')
  useEffect(() => {
    if (window) {
      setApproval(sessionStorage.getItem(address))
    }
  }, [])

  const event = useContractEvent({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    eventName: 'Approval',
    listener: (owner, spender, value) => {
      setApproval(value)
      if (window) {
        window.sessionStorage.setItem(owner, value)
      }
    },
  })

  // Mint Amount
  const [mintAmount, setMintAmount] = useState('')
  const debouncedMintAmount = useDebounce(mintAmount, 500)
  const {
    config: configHalalanft,
    error: prepareHalalanftError,
    isError: isPrepareHalalanftError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    functionName: 'mint',
    abi: HalalanftABI.abi,
    args: [parseInt(debouncedMintAmount)],
    enabled: mintingEnabled && Boolean(debouncedMintAmount),
  })
  const {
    data: dataHalalanft,
    error: errorHalalanft,
    isError: isHalalanftError,
    isLoading: isHalalanftLoading,
    write: writeHalalanft,
  } = useContractWrite(configHalalanft)

  const {
    isLoading: isLoadingTransactionHalalanft,
    isSuccess: isSuccessTransactionHalalanft,
  } = useWaitForTransaction({
    hash: dataHalalanft?.hash,
  })

  const [value, setValue] = useState(0)
  const [approved, setApproved] = useState(false)

  return (
    <div>
      {/* Approval */}
      {!isSuccessTransactionUSDC && balanceOf === 0 ? (
        <div>
          <p>You need to approve USDC token first.</p>
          <button
            disabled={
              !writeHalalanft ||
              isLoadingTransactionHalalanft ||
              isHalalanftLoading
            }
            onClick={() => {
              const result = writeUSDC?.()
              setApproval(nftPrice)
            }}
          >
            {isLoadingTransactionUSDC ? 'Waiting for Approval' : 'Approve USDC'}
          </button>
        </div>
      ) : (
        <Formik
          initialValues={{ mintingNumber: 0 }}
          onSubmit={(values, { setSubmitting }) => {
            setMintAmount(input.value)
            writeHalalanft?.()
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <Field
                as="input"
                type="number"
                name="mintingNumber"
                onChange={Formik.onChange}
              >
                {() => (
                  <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                    <label>Select Amount</label>
                    <div>
                      <button
                        {...dec}
                        className="h-6 w-6 rounded-md bg-blue-900 font-bold text-white shadow-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        placeholder="put amount to mint"
                        className="mx-4"
                        {...input}
                      />
                      <button
                        {...inc}
                        className="h-6 w-6 rounded-md bg-blue-900 font-bold text-white shadow-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </Field>

              <button
                disabled={!mintingEnabled}
                type="submit"
                className="my-8 rounded-md bg-blue-900 px-4 py-2 font-bold text-white"
              >
                {mintingEnabled ? 'Mint' : 'Minting Disabled'}
              </button>
            </Form>
          )}
        </Formik>
      )}
      {isConnected ? (
        <div className="my-8">
          <p>{'You own: ' + balanceOf?.toString()}</p>
          <p>
            {'Your USDC: ' +
              balanceOfUSDC
                ?.toString()
                .substring(0, balanceOfUSDC.toString().length - 6)}
          </p>
        </div>
      ) : (
        <></>
      )}
      <div>
        {/* Amount */}
        <div className="flex flex-col gap-4 p-4">
          <label htmlFor="currency" className="text-2xl font-bold">
            Amount
          </label>
          <div className="flex flex-row items-center rounded-md bg-white">
            <input
              type="number"
              name="price"
              id="price"
              min={1}
              className="block w-full rounded-md p-2 pr-1 text-right outline-0"
              placeholder="10"
              defaultValue={value}
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
          {approved ? (
            <>
              <BuyButton isConnected={isConnected} value={value} />
            </>
          ) : (
            <ApproveButton
              isConnected={isConnected}
              value={value}
              onApproved={() => setApproved(true)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const ApproveButton = ({ isConnected, value, onApproved }) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    functionName: 'approve',
    enabled: !!isConnected,
    args: [ContractAddress.Halalanft, value],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="flex flex-col gap-4">
      <button
        className="rounded-md bg-blue-900 px-4 py-2 font-bold text-white"
        disabled={!writeAsync || isLoading || isWriteLoading}
        onClick={async () => {
          await writeAsync().then(() => {
            onApproved()
          })
        }}
      >
        {isLoading || isWriteLoading ? 'Loading...' : 'Approve'}
      </button>
      {(isPrepareError || isWriteError || isError) && (
        <span className="max-h-32 overflow-y-scroll text-red-500 xl:max-w-[16rem]">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

const BuyButton = ({ isConnected, value, tokenID }) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'buyFraction',
    enabled: !!isConnected,
    args: [tokenID, value],
  })
  const {
    data: writeData,
    error: writeError,
    isError: isWriteError,
    isLoading: isWriteLoading,
    writeAsync,
  } = useContractWrite(config)
  const { error, isLoading, isError } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return (
    <div className="flex flex-col gap-4">
      <button
        className="rounded-md bg-blue-900 px-4 py-2 font-bold text-white"
        disabled={!writeAsync || isLoading || isWriteLoading}
        onClick={async () => {
          await writeAsync().then(() => {
            onApproved()
          })
        }}
      >
        {isLoading || isWriteLoading ? 'Loading...' : 'Buy'}
      </button>
      {(isPrepareError || isWriteError || isError) && (
        <span className="max-h-32 overflow-y-scroll text-red-500 xl:max-w-[16rem]">
          Error: {(prepareError || writeError || error)?.message}
        </span>
      )}
    </div>
  )
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
