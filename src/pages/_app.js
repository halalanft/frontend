import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import { chains, wagmiClient } from 'src/lib/wagmi'
import { WagmiConfig } from 'wagmi'

import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import '~/styles/index.css'

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
)

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <WagmiConfig client={wagmiClient}>
      <Toaster />
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
