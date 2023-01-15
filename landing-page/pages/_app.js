import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains([mainnet, avalanche, avalancheFuji], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: "Halalanft",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
export default MyApp;
