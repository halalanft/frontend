import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/index.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiClient } from 'src/lib/wagmi'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {getLayout(<Component {...pageProps} />)}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
