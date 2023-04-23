import {
  Box,
  Collapse,
  Flex,
  Heading,
  Image,
  Link,
  Show,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import logo from '~/assets/images/fix.png'
import HalalanftABI from '~/contracts/Halalanft.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'

export default function MintingHeader() {
  const { address, isConnected } = useAccount()
  const isMounted = useIsMounted()
  const { data: dataBalanceNFT } = useContractRead({
    abi: HalalanftABI.abi,
    address: Halalanft,
    enabled: isMounted && isConnected,
    functionName: 'balanceOf',
    args: [address],
  })

  const [totalNFT, setTotalNFT] = useState(0)
  useEffect(() => {
    if (dataBalanceNFT) {
      setTotalNFT(dataBalanceNFT)
    }
  }, [dataBalanceNFT])

  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex
        pos="sticky"
        w="100%"
        zIndex={2}
        bgColor="#FAD02C"
        p={4}
        color="#374C8C"
        align="center"
        justify="space-between"
      >
        <Flex alignItems="center">
          <Link
            cursor="pointer"
            textDecoration="none"
            href="/"
            _hover={{ textDecoration: 'none' }}
          >
            <Image src={logo.src} alt="Logo" width={64} height={32} />
          </Link>
          <Heading as="p" size="md" pl={4} color="white">
            Halalanft
          </Heading>
        </Flex>
        <Show above="sm">
          <Flex direction="row" align="center" gap={12}>
            <Link href="/">
              <Text>Home</Text>
            </Link>
            {isMounted && isConnected && totalNFT > 0 ? (
              <Link href="/dashboard">
                <Text>Dashboard</Text>
              </Link>
            ) : (
              <></>
            )}
          </Flex>
        </Show>
      </Flex>
      {/* Mobile Nav */}
      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg="#FAD02C">
          <Stack spacing={4} my={2}>
            <Link href="/">
              <Text fontWeight="semibold">Home</Text>
            </Link>
            <Box bgColor="#374C8C" h="1px"></Box>
          </Stack>
        </Box>
      </Collapse>
    </>
  )
}
