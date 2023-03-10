import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
  avalanche,
  avalancheFuji,
} from 'wagmi/chains'
import {
  rainbowWallet,
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
  argentWallet,
  trustWallet,
  omniWallet,
  imTokenWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { publicProvider } from 'wagmi/providers/public'
import { configureChains, createClient } from 'wagmi'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'

const { chains, provider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    polygonMumbai,
    avalanche,
    avalancheFuji,
  ],
  [publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      rainbowWallet({ chains }),
      coinbaseWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'More',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { chains, provider, connectors, wagmiClient }
