// import { useAccount } from 'wagmi'
// import { ConnectButton } from '@rainbow-me/rainbowkit'
// import useIsMounted from '@/hooks/useIsMounted'
// import SendTransaction from './send-transaction'
// import MintNFT from './mint-nft'
// import { MintingHeader } from '@/components/header'

// export default function Test() {
//   const mounted = useIsMounted
//   const { address, isConnected } = useAccount()

//   return (
//     <>
//       <MintingHeader />
//       <div className="mx-auto mt-8 w-full rounded-lg bg-white p-8 text-center shadow-xl md:w-2/3 lg:w-1/2">
//         <div className="my-8 flex justify-center">
//           <ConnectButton
//             label="Connect Wallet"
//             accountStatus={'full'}
//             chainStatus={'none'}
//             showBalance={false}
//           />
//         </div>

//         {mounted
//           ? address && (
//               <p className="mb-5 text-gray-400">My address is {address}</p>
//             )
//           : null}

//         {isConnected && (
//           <div>
//             <MintNFT isConnected={isConnected} />
//           </div>
//         )}
//         {/* <SendTransaction /> */}
//       </div>
//     </>
//   )
// }

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useNumberInput,
  VStack,
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { getAddress } from 'ethers/lib/utils.js'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import ContractAddress from '@/contracts/address.json'
import ERC20ABI from '@/contracts/erc20ABI.json'
import HalalanftABI from '@/contracts/Halalanft.json'
import useIsMounted from '@/hooks/useIsMounted.js'

export default function Minting({ ...props }) {
  const nftPrice = 1000000000
  const mounted = useIsMounted

  const { address: accAddress, connector, isConnected } = useAccount()
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      max: 10,
    })
  const { chain: networkChain } = useNetwork()

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  const { data: mintingEnabled } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected,
    functionName: 'mintingEnabled',
    watch: true,
  })

  const { data: balanceOfUSDC } = useContractRead({
    address: ContractAddress.USDC,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    enabled: !!isConnected,
    args: [accAddress],
    onError(error) {
      console.log('Error Balance USDC', error)
    },
  })

  const { data: balanceOf } = useContractRead({
    address: ContractAddress.Halalanft,
    abi: HalalanftABI.abi,
    functionName: 'balanceOf',
    enabled: !!isConnected,
    args: [accAddress],
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

  const [approval, setApproval] = useState('')
  useEffect(() => {
    if (window) {
      setApproval(sessionStorage.getItem(accAddress))
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
    onError(error) {
      console.log('Error Minting Halalanft', error)
    },
  })

  const {
    data: dataHalalanft,
    error: errorHalalanft,
    isError: isHalalanftError,
    write: writeHalalanft,
  } = useContractWrite(configHalalanft)

  const {
    isLoading: isLoadingTransactionHalalanft,
    isSuccess: isSuccessTransactionHalalanft,
  } = useWaitForTransaction({
    hash: dataHalalanft?.hash,
  })

  return (
    <>
      <Stack direction="row">
        <Box align="center">
          {mounted && networkChain.id != connector.chains[0].id ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Wrong Network!
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    connector.connect({ chainId: connector.chains[0].id })
                  }
                >
                  {connector.chains[0].name}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Box
                color="blackAlpha.700"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="2xl"
                textTransform="uppercase"
              >
                Phase 1
              </Box>
              <Box>
                {!isSuccessTransactionUSDC & (balanceOf < 1) ? (
                  <Box
                    color="blackAlpha.700"
                    align="center"
                    flexDirection="column"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="lg"
                    textTransform="uppercase"
                    pb="5px"
                  >
                    <Text>You need to approve USDC token first.</Text>

                    <Button
                      my="16px"
                      variant="outline"
                      outlineColor="#FFCC15"
                      key={connector.id}
                      disabled={!connector.ready}
                      onClick={() => {
                        writeUSDC?.()
                        setApproval(nftPrice)
                      }}
                      w="fit-content"
                    >
                      {isLoadingTransactionUSDC
                        ? 'Waiting for Approval'
                        : 'Approve USDC'}
                    </Button>
                  </Box>
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
                        <VStack>
                          <Field
                            as="input"
                            type="number"
                            name="mintingNumber"
                            onChange={Formik.onChange}
                          >
                            {() => (
                              <FormControl>
                                <FormLabel>Select Amount</FormLabel>
                                <HStack maxW="150px">
                                  <Button
                                    fontWeight="bold"
                                    colorScheme="facebook"
                                    {...dec}
                                  >
                                    -
                                  </Button>
                                  <Input
                                    textAlign="right"
                                    type="number"
                                    placeholder="put amount to mint"
                                    {...input}
                                  />
                                  <Button
                                    fontWeight="bold"
                                    colorScheme="facebook"
                                    {...inc}
                                  >
                                    +
                                  </Button>
                                </HStack>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            mt={4}
                            disabled={!mintingEnabled}
                            colorScheme="facebook"
                            type="submit"
                          >
                            {mintingEnabled ? 'Mint' : 'Minting Disabled'}
                          </Button>
                        </VStack>
                      </Form>
                    )}
                  </Formik>
                )}
              </Box>
            </>
          )}
          {isConnected ? (
            <Box align="center" mt="2px">
              <Text>{'You own: ' + balanceOf?.toString()}</Text>
              <Text>
                {'Your USDC: ' +
                  balanceOfUSDC
                    ?.toString()
                    .substring(0, balanceOfUSDC.toString().length - 6)}
              </Text>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </>
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
