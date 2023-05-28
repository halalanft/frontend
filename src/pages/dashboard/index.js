import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import { DashboardLayout } from '~/components/layout'
import {
  AttributesSection,
  FeatureSection,
  MyCollectionSection,
} from '~/components/pages/dashboard'
import HalalanftABI from '~/contracts/Halalanft.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'
import { LoadingLayer } from '~/utils/loading-layer'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [tokens, setTokens] = useState([])
  const [iterationArgs, setIterationArgs] = useState([address, 0, 100]) // Initial values
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [isTokensFetched, setIsTokensFetched] = useState(false)

  const router = useRouter()

  const isMounted = useIsMounted()
  const { data: dataBalanceNFT, refetch: refetchBalance } = useContractRead({
    abi: HalalanftABI.abi,
    address: Halalanft,
    enabled: isMounted && isConnected,
    functionName: 'balanceOf',
    watch: true,
    args: [address],
  })

  const [totalNFT, setTotalNFT] = useState(0)
  useEffect(() => {
    if (dataBalanceNFT !== totalNFT) {
      setTotalNFT(dataBalanceNFT.toNumber())
    }
  }, [dataBalanceNFT, totalNFT])

  const { data: tokensOfOwnerData, refetch } = useContractRead({
    abi: HalalanftABI.abi,
    address: Halalanft,
    enabled: isConnected && address,
    functionName: 'tokensOfOwnerIn',
    args: iterationArgs,
    select: (data) => data.map((token) => token.toNumber()),
    watch: true,
  })

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    async function fetchTokens() {
      if (address) {
        const chunkSize = 100
        let fetchedTokens = []

        let start = 1
        let stop = start + chunkSize
        while (fetchedTokens.length < totalNFT && !isFetching) {
          setIterationArgs([address, start, stop])
          setIsFetching(true) // Start fetching
          const refetchedData = await refetch()
          setIsFetching(false) // Done fetching

          if (refetchedData && refetchedData.data) {
            const newTokens = refetchedData.data.filter(
              (token) => !fetchedTokens.includes(token)
            )
            fetchedTokens = [...fetchedTokens, ...newTokens]

            // Prepare for the next iteration.
            start += chunkSize
            stop = start + chunkSize
          }
        }

        setTokens(fetchedTokens)
        setIsTokensFetched(true)
      }
    }

    fetchTokens()
  }, [address, totalNFT, refetch])

  const handleMintingRedirect = () => {
    router.push('/minting')
  }

  useEffect(() => {
    if (address) {
      setSelectedToken(0)
    }
  }, [address])

  const [selectedToken, setSelectedToken] = useState(null)
  const [attrLoaded, setAttrLoaded] = useState(false)
  useEffect(() => {
    if (tokens.length > 0 && selectedToken === null) {
      setSelectedToken(tokens[0])
    }
  }, [tokens, selectedToken])

  useEffect(() => {
    if (tokens.length > 0 && address) {
      setSelectedToken(tokens[0])
    }
  }, [tokens, address])

  const { chains, chain } = useNetwork()
  // Check if the user is in the correct network
  const supportedChains = chains.map(({ id }) => id)
  const [isWrongNetwork, setIsWrongNetwork] = useState(
    !supportedChains.includes(chain?.id)
  )

  useEffect(() => {
    setIsWrongNetwork(!supportedChains.includes(chain?.id))
  }, [supportedChains, chain])
  return (
    <>
      {!isMounted ? (
        <LoadingLayer />
      ) : !isConnected ? (
        <>
          <Flex direction="column" mt={8} justify="center" align="center" p={6}>
            <Text fontSize="lg" fontWeight="bold" mb={4} align="center">
              Connect your Metamask wallet and make sure you are in the right
              network
            </Text>
            <ConnectButton />
          </Flex>
        </>
      ) : isTokensFetched ? (
        <>
          <Box p={4} maxWidth={'100%'} bg="white">
            <Flex
              bg="yellow.200"
              borderRadius="lg"
              direction="row"
              maxWidth="100%"
              overflowX="auto"
              whiteSpace="nowrap"
              mb={4}
            >
              <MyCollectionSection
                tokens={tokens}
                setSelectedToken={setSelectedToken}
                imagesLoaded={imagesLoaded}
                setImagesLoaded={setImagesLoaded}
              />
            </Flex>
            <Grid
              gap={4}
              templateColumns={{ md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
            >
              <Box borderRadius="lg" bg="yellow.200">
                {tokens.length > 0 && selectedToken ? (
                  <AttributesSection
                    selectedToken={selectedToken}
                    setAttrLoaded={setAttrLoaded}
                  />
                ) : (
                  <></>
                )}
              </Box>
              <Box borderRadius="lg" bg="yellow.200">
                {tokens.length > 0 && selectedToken ? (
                  <FeatureSection selectedToken={selectedToken} />
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Box>
          {!attrLoaded && <LoadingLayer />}
        </>
      ) : (
        <Box textAlign="center" mt={8}>
          <Text fontSize="lg" fontWeight="bold" px={6} py={4} mb={4}>
            You do not have any NFTs, please purchase in the minting section
            below
          </Text>
          <Button
            bg="#374C8C"
            textColor="white"
            borderWidth={2}
            borderRadius="lg"
            borderColor="#374C8C"
            fontSize="md"
            fontWeight="medium"
            transition="all 0.2s"
            _hover={{
              borderWidth: '4',
              borderColor: '#374C8C',
              bg: 'transparent',
              color: '#374C8C',
            }}
            onClick={handleMintingRedirect}
          >
            Mint Now!
          </Button>
        </Box>
      )}
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
