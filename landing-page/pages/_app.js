import "../styles/globals.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { avalanche, mainnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains([avalanche, mainnet, polygonMumbai], [publicProvider()]);

const client = createClient({
	autoConnect: true,
	provider,
	webSocketProvider,
	connectors: [new WalletConnectConnector({ chains }), new CoinbaseWalletConnector({ chains }), new InjectedConnector({ chains, options: { name: "Injected" } }), new MetaMaskConnector({ chains })],
});

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={client}>
			<Component {...pageProps} />
		</WagmiConfig>
	);
}
export default MyApp;
