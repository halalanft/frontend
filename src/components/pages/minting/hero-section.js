import { Box, Center, Hide, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { useDebounce } from '~/utils/debounce'

export default function HeroSection() {
  const isMounted = useIsMounted()
  const { chains, chain } = useNetwork()
  const { address, isConnected } = useAccount()

  // Check if the user is in the correct network
  const supportedChains = chains.map(({ id }) => id)
  const [isWrongNetwork, setIsWrongNetwork] = useState(
    !supportedChains.includes(chain?.id)
  )

  useEffect(() => {
    setIsWrongNetwork(!supportedChains.includes(chain?.id))
  }, [supportedChains, chain])

  // Get the balance
  const debouncedAddress = useDebounce(address, 500)
  return (
    <Box bg="white" borderRadius="md" shadow="xl" py={8}>
      <Text color="#FAD02C" align="center" fontSize="xl">
        HALALANFT MINTING
      </Text>
      <Text
        fontSize="4xl"
        align="center"
        fontWeight="bold"
        opacity="0.68"
        mb={6}
      >
        Are You Ready?
      </Text>

      {!!isWrongNetwork && isMounted ? (
        <Text align="center" px={6} mb={8}>
          Connect your Metamask wallet and make sure you are in the right
          network
        </Text>
      ) : (
        <Text align="center" mb={8} color="red.400">
          You are in the wrong network
        </Text>
      )}

      <Center mb={8}>
        <ConnectButton />
      </Center>
      <Hide below="lg">
        <Center my={6}>
          <Text align="center" w="80%">
            You will need to have USDC on the {process.env.NEXT_PUBLIC_CHAIN}{' '}
            network to mint the NFT.
          </Text>
        </Center>
      </Hide>
    </Box>
  )
}
