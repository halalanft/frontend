import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient } from 'wagmi'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const rpcNetwork =
  process.env.NEXT_PUBLIC_CHAIN === 'fuji' ? 'avalanche_fuji' : 'avalanche'
const urlRpc = `https://rpc.ankr.com/${rpcNetwork}`

const { chains, provider } = configureChains(
  process.env.NEXT_PUBLIC_CHAIN === 'fuji' ? [avalancheFuji] : [avalanche],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: urlRpc,
      }),
    }),
  ]
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

export { chains, connectors, provider, wagmiClient }
