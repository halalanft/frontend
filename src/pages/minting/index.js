import {
  Box,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Show,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useContractEvent } from 'wagmi'
import { MintingLayout } from '~/components/layout'
import {
  HeroSection,
  PurchaseSection,
  ResultSection,
} from '~/components/pages/minting'
import HalalanftABI from '~/contracts/Halalanft.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'
import { LoadingLayer } from '~/utils/loading-layer'

export default function MintingPage() {
  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  const [activeTab, setActiveTab] = useState(1)
  const [tokenBought, setTokenBought] = useState([])
  const handleTab = (index) => {
    setActiveTab(index)
  }

  useEffect(() => {
    isConnected
      ? tokenBought.length > 0
        ? setActiveTab(3)
        : setActiveTab(2)
      : setActiveTab(1)
  }, [isConnected, isMounted, tokenBought])

  useContractEvent({
    address: Halalanft,
    abi: HalalanftABI.abi,
    enabled: !!isConnected && isMounted,
    eventName: 'Transfer',
    watch: true,
    listener: (from, to, tokenId) => {
      if (address === to) {
        setTokenBought((prevTokenIds) => [...prevTokenIds, tokenId.toNumber()])
      }
    },
  })

  return (
    <Box
      style={{
        height: '100%',
        background: 'linear-gradient(180deg, #fff 30%, #fad02c 70%)',
      }}
      p={{ md: 6 }}
    >
      {!isMounted ? <LoadingLayer /> : <></>}
      <Flex
        direction={['column', 'row']}
        align={['left', 'center']}
        justify={['center', 'space-around']}
        p={6}
        gap={6}
      >
        <Stack
          direction="row"
          align="center"
          spacing={4}
          borderBottom={['2px', '0px']}
          borderColor="gray.100"
          cursor="default"
        >
          <Flex
            bgColor="#374CBC"
            w={8}
            h={8}
            textColor="white"
            justify="center"
            align="center"
            borderRadius="lg"
          >
            1
          </Flex>
          <Stack direction="column" spacing={0}>
            <Text fontWeight="semibold">CONNECT</Text>
            <Text>wallet and check network</Text>
            {activeTab === 1 ? (
              <Box h="1px" w="full" bgColor="#374CBC"></Box>
            ) : null}
          </Stack>
        </Stack>

        <Stack
          direction="row"
          align="center"
          spacing={4}
          borderBottom={['2px', '0px']}
          borderColor="gray.100"
          cursor="default"
        >
          <Flex
            bgColor="#374CBC"
            w={8}
            h={8}
            textColor="white"
            justify="center"
            align="center"
            borderRadius="lg"
          >
            2
          </Flex>
          <Stack direction="column" spacing={0}>
            <Text fontWeight="semibold">CHECKOUT</Text>
            <Text>quantity and mint</Text>
            {activeTab === 2 ? (
              <Box h="1px" w="full" bgColor="#374CBC"></Box>
            ) : null}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          align="center"
          spacing={4}
          borderBottom={['2px', '0px']}
          borderColor="gray.100"
          cursor="default"
        >
          <Flex
            bgColor="#374CBC"
            w={8}
            h={8}
            textColor="white"
            justify="center"
            align="center"
            borderRadius="lg"
          >
            3
          </Flex>
          <Stack direction="column" spacing={0}>
            <Text fontWeight="semibold">REVIEW</Text>
            <Text>receipt</Text>
            {activeTab === 3 ? (
              <Box h="1px" w="full" bgColor="#374CBC"></Box>
            ) : null}
          </Stack>
        </Stack>
      </Flex>
      <Show above="sm">
        <Box h="1px" w="full" bgColor="gray.100"></Box>
      </Show>

      {isMounted && activeTab === 1 && <HeroSection />}

      {isMounted && activeTab === 2 && <PurchaseSection />}

      {isMounted && activeTab === 3 && tokenBought.length > 0 && (
        <ResultSection tokenBought={tokenBought} />
      )}
    </Box>
  )
}

MintingPage.getLayout = function getLayout(page) {
  return <MintingLayout>{page}</MintingLayout>
}
