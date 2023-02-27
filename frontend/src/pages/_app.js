import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/index.css'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { wagmiClient, chains } from 'src/lib/wagmi'

// import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {/* <ChakraProvider> */}
        <Component {...pageProps} />
        {/* </ChakraProvider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
