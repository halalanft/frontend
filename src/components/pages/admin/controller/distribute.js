import { Button, Flex, Text } from '@chakra-ui/react'
import HalalanftABI from '~/contracts/Halalanft.json'
import ERC20ABI from '~/contracts/erc20ABI.json'

import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import {
  FILANTROFI,
  Halalanft,
  MARKOPS,
  TEAMS,
  TREASURY,
  USDC,
} from '~/utils/contract-address'

export default function DistributeSection({ isConnected }) {
  const { address } = useAccount()
  const isMounted = useIsMounted()
  const {
    data: currentMainBalance,
    isError: isMainBalanceError,
    isLoading: isMainBalanceLoading,
  } = useContractRead({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    functionName: 'balanceOf',
    args: [Halalanft],
    watch: true,
  })
  const {
    data: currentTreasuryBalance,
    isError: isTreasuryBalanceError,
    isLoading: isTreasuryBalanceLoading,
  } = useContractRead({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    functionName: 'balanceOf',
    args: [TREASURY],
    watch: true,
  })
  const {
    data: currentFilantrofiBalance,
    isError: isFilantrofiBalanceError,
    isLoading: isFilantrofiBalanceLoading,
  } = useContractRead({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    functionName: 'balanceOf',
    args: [FILANTROFI],
    watch: true,
  })
  const {
    data: currentMarkopsBalance,
    isError: isMarkopsBalanceError,
    isLoading: isMarkopsBalanceLoading,
  } = useContractRead({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    functionName: 'balanceOf',
    args: [MARKOPS],
    watch: true,
  })
  const {
    data: currentTeamsBalance,
    isError: isTeamsBalanceError,
    isLoading: isTeamsBalanceLoading,
  } = useContractRead({
    address: USDC,
    abi: ERC20ABI,
    enabled: !!isConnected,
    functionName: 'balanceOf',
    args: [TEAMS],
    watch: true,
  })
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS

  const [walletBalance, setWalletBalance] = useState({
    halalanft: 0,
    treasury: 0,
    filantrofi: 0,
    markops: 0,
    teams: 0,
  })
  useEffect(() => {
    const getWalletBalance = async () => {
      const main = await currentMainBalance
      const treasury = await currentTreasuryBalance
      const filantrofi = await currentFilantrofiBalance
      const markops = await currentMarkopsBalance
      const teams = await currentTeamsBalance
      isConnected &&
        main &&
        treasury &&
        filantrofi &&
        markops &&
        teams &&
        setWalletBalance({
          halalanft: Number(BigInt(main) / BigInt(10 ** 6)),
          treasury: Number(BigInt(treasury) / BigInt(10 ** 6)),
          filantrofi: Number(BigInt(filantrofi) / BigInt(10 ** 6)),
          markops: Number(BigInt(markops) / BigInt(10 ** 6)),
          teams: Number(BigInt(teams) / BigInt(10 ** 6)),
        })
    }
    getWalletBalance()
  }, [
    isConnected,
    currentMainBalance,
    currentTreasuryBalance,
    currentFilantrofiBalance,
    currentMarkopsBalance,
    currentTeamsBalance,
  ])
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Halalanft,
    enabled:
      isMounted &&
      isConnected &&
      address === adminAddress &&
      walletBalance.halalanft > 0,
    abi: HalalanftABI.abi,
    functionName: 'distribute',
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
  console.log(walletBalance)
  return (
    <>
      <Text
        as="label"
        htmlFor="distribute-halalanft"
        fontSize="xl"
        fontWeight="semibold"
        color="#363755"
      >
        Distribution Income
      </Text>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Main Balance:
        </Text>
        <Text
          color={
            isMounted && walletBalance.halalanft > 0 ? '#5BD3C7' : 'red.500'
          }
        >
          {walletBalance.halalanft} USDC
        </Text>
      </Flex>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Treasury Balance:
        </Text>
        <Text
          color={
            isMounted && walletBalance.treasury > 0 ? '#5BD3C7' : 'red.500'
          }
        >
          {walletBalance.treasury} USDC
        </Text>
      </Flex>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Filantrofi Balance:
        </Text>
        <Text
          color={
            isMounted && walletBalance.filantrofi > 0 ? '#5BD3C7' : 'red.500'
          }
        >
          {walletBalance.filantrofi} USDC
        </Text>
      </Flex>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Markops Balance:
        </Text>
        <Text
          color={isMounted && walletBalance.markops > 0 ? '#5BD3C7' : 'red.500'}
        >
          {walletBalance.markops} USDC
        </Text>
      </Flex>
      <Flex direction="row">
        <Text mr="8" color="gray.700">
          Teams Balance:
        </Text>
        <Text
          color={isMounted && walletBalance.teams > 0 ? '#5BD3C7' : 'red.500'}
        >
          {walletBalance.teams} USDC
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
        isDisabled={
          !write ||
          isLoading ||
          isMainBalanceLoading ||
          isFilantrofiBalanceLoading ||
          isMarkopsBalanceLoading ||
          isTeamsBalanceLoading ||
          isTreasuryBalanceLoading ||
          walletBalance.halalanft <= 0
        }
        onClick={async () => write()}
        _hover={{
          borderColor: '#374C8C',
          bg: 'transparent',
          color: '#374C8C',
        }}
      >
        {isMainBalanceLoading || isLoading || isWriteLoading
          ? 'Loading...'
          : isMounted && walletBalance.halalanft > 0
          ? 'Distribute'
          : 'Empty'}
      </Button>
      {(isPrepareError || isWriteError || isMainBalanceError) && (
        <Text color="red.500">
          Error: {(prepareError || writeError || error)?.message}
        </Text>
      )}
    </>
  )
}
