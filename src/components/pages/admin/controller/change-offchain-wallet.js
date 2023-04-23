import HalalanftABI from '~/contracts/Halalanft.json'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'

export default function ChangeOffchainWalletSection({ isConnected }) {
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
    <>
      <Text
        as="label"
        htmlFor="treasury-wallet"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Change Offchain Wallet
      </Text>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          current offchain wallet:
        </Text>
        <Text color={'#374C8C'}>{valueOffchainWallet}</Text>
      </Flex>
      <Input
        type="text"
        name="treasury-wallet"
        id="treasury-wallet"
        borderColor="#374C8C"
        textAlign="right"
        placeholder="0x0000000000000000000000000000000000000000"
        isDisabled={readOffchainWalletLoading}
        value={valueOffchainWallet}
        onChange={({ target }) => setValueOffchainWallet(target.value)}
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
          isDisabled={isOffchainWalletLoading || isWriteOffchainWalletLoading}
          onClick={async () => writeOffchainWallet()}
          transition="all 0.2s"
          _hover={{
            borderWidth: '4',
            borderColor: '#374C8C',
            bg: 'transparent',
            color: '#374C8C',
          }}
        >
          {isOffchainWalletLoading || isWriteOffchainWalletLoading
            ? 'Loading...'
            : 'Update'}
        </Button>
      </Box>
      {(isPrepareOffchainWalletError ||
        isWriteOffchainWalletError ||
        isOffchainWalletError) && (
        <Text color="red.500">
          Error:{' '}
          {
            (
              prepareOffchainWalletError ||
              writeOffchainWalletError ||
              errorOffchainWallet
            )?.message
          }
        </Text>
      )}
    </>
  )
}
