<<<<<<< HEAD
import { Box, Button, Flex, Text } from '@chakra-ui/react'
=======
import { Box, Button, Flex, Stack, Text, Grid } from '@chakra-ui/react'
>>>>>>> a58f1f2a303e8f402973d7bc38350b5a1e8a1cae
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import DashboardLayout from '~/components/layout/dashboard'
import {
    AttributesSection,
    FeatureSection,
    MyCollectionSection,
} from '~/components/pages/dashboard'
import HalalanftABI from '~/contracts/Halalanft.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { Halalanft } from '~/utils/contract-address'
import { useDebounce } from '~/utils/debounce'
import { LoadingLayer } from '~/utils/loading-layer'

export default function Dashboard() {
  const [tokens, setTokens] = useState([])
  const [dynamicArgs, setDynamicArgs] = useState([])
  const [imagesLoaded, setImagesLoaded] = useState({})

  const router = useRouter()
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

  const debouncedDynamicArgs = useDebounce(dynamicArgs, 300)

  const { data: tokensOfOwnerData } = useContractRead({
    abi: HalalanftABI.abi,
    address: Halalanft,
    enabled: isMounted && debouncedDynamicArgs.length > 0,
    functionName: 'tokensOfOwnerIn',
    watch: true,
    args: debouncedDynamicArgs,
  })

  useEffect(() => {
    async function fetchTokens() {
      if (address && dataBalanceNFT) {
        const balance = dataBalanceNFT.toNumber()
        const chunkSize = 100
        let fetchedTokens = []

        for (let i = 0; i < Math.ceil(balance / chunkSize); i++) {
          const start = i * chunkSize
          const stop = start + chunkSize
          setDynamicArgs([address, start, stop])

          await new Promise((resolve) => {
            if (tokensOfOwnerData) {
              resolve()
            }
          })

          if (tokensOfOwnerData) {
            const convertedTokens = tokensOfOwnerData.map((token) =>
              token.toNumber()
            )
            fetchedTokens = [...fetchedTokens, ...convertedTokens]
            if (fetchedTokens.length >= balance) {
              break
            }
          }
        }

        setTokens(fetchedTokens.slice(0, balance))
      }
    }

    fetchTokens()
  }, [address, dataBalanceNFT, tokensOfOwnerData])

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
      ) : totalNFT > 0 ? (
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
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            You do not have any NFTs, please purchase in the minting section
            below
          </Text>
          <Button
            bg="#FAD02C"
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
            Mint Now!!
          </Button>
        </Box>
      )}
    </>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
