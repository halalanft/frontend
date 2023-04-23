import { Button, Flex, Text } from '@chakra-ui/react'
import HalalanftABI from '~/contracts/Halalanft.json'

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function EnableDisableMintingSection({ isConnected }) {
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
    <>
      <Text
        as="label"
        htmlFor="minting-villa"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Enable/Disable Minting NFT
      </Text>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Minting Status:
        </Text>
        <Text color={isMounted && debouncedMinting ? '#5BD3C7' : 'red.500'}>
          {isMounted && debouncedMinting ? 'Enabled' : 'Disabled'}
        </Text>
      </Flex>

      <Button
        bg="#374C8C"
        textColor="white"
        w="100%"
        borderWidth={2}
        borderRadius="lg"
        borderColor="#374C8C"
        fontSize="md"
        fontWeight="medium"
        disabled={!write || isLoading || isWriteLoading}
        onClick={async () => write()}
        transition="all 0.2s"
        _hover={{
          borderWidth: '4',
          borderColor: '#374C8C',
          bg: 'transparent',
          color: '#374C8C',
        }}
      >
        {isLoading || isWriteLoading
          ? 'Loading...'
          : isMounted && debouncedMinting
          ? 'Disable'
          : 'Enable'}
      </Button>
      {(isPrepareError || isWriteError || isError) && (
        <Text color="red.500">
          Error: {(prepareError || writeError || error)?.message}
        </Text>
      )}
    </>
  )
}
