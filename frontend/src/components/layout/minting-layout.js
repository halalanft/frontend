import { Box, Flex, Heading, Image, SimpleGrid, Spacer } from '@chakra-ui/react'
import { Router } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useLoadingProgress } from '../loadingProgress'
import WalletConnectButton from '../walletConnectButton'

const Layout = ({ children, ...props }) => {
  // 1. useLoadingProgress hook
  const { start, done } = useLoadingProgress()

  // 2. onRouterChangeStart
  const onRouteChangeStart = () => {
    start()
  }

  // 3. onRouterChangeComplete
  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }

  const { isConnected } = useAccount()

  const onWalletConnection = () => {
    start()
  }

  const onWalletConnectionComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }

  // 4. Subscribe to router events
  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.events.off('routeChangeError', onRouteChangeComplete)
    }
  }, [])

  useEffect(() => {
    onWalletConnection()
    onWalletConnectionComplete()
  }, [isConnected])

  return (
    <SimpleGrid columns={1} spacing={1}>
      <Box py="6" h="30vh" bg="white">
        <Flex px="8" minWidth="max-content" alignItems="center" gap="5">
          <Box p="2">
            <Heading size="md">Halalanft</Heading>
          </Box>
          <Spacer />
          <WalletConnectButton />
        </Flex>
      </Box>

      {children}
    </SimpleGrid>
  )
}

export default Layout
