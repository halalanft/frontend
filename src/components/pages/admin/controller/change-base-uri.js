import HalalanftABI from '~/contracts/Halalanft.json'

import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'

export default function ChangeBaseURISection({ isConnected, address }) {
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
    <>
      <Text
        as="label"
        htmlFor="treasury-wallet"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Change Base URI
      </Text>
      <Input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        borderColor="#374C8C"
        textAlign="right"
        placeholder="https://nft..com"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <Box display="flex" justifyContent="flex-end">
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
          {isLoading || isWriteLoading ? 'Loading...' : 'Update'}
        </Button>
      </Box>
      {(isPrepareError || isWriteError || isError) && (
        <Text color="red.500">
          Error: {(prepareError || writeError || error)?.message}
        </Text>
      )}
    </>
  )
}
