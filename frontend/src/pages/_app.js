import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/index.css'
// import { WagmiConfig } from 'wagmi'
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
// import { wagmiClient, chains } from 'src/lib/wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Layout } from '@/components/layout'
import { LoadingProgressProvider } from '@/components/loadingProgress'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        {/* <RainbowKitProvider chains={chains}> */}

        <Component {...pageProps} />
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  )
}

const { chains, provider } = configureChains(
  process.env.NEXT_PUBLIC_CHAIN === 'avalanche' ? [avalanche] : [avalancheFuji],
  [publicProvider()]
)

const connectors = [new MetaMaskConnector({ chains })]

const client = createClient({
  connectors,
  provider,
})

export default MyApp
