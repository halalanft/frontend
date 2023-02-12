import React from "react";
import { useConnect, useDisconnect, useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useIsMounted } from "../hooks/useIsMounted";
import SendTransaction from "./SendTransaction";
import MintNFT from "./MintNFT";

export default function Test() {
	// const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
	const mounted = useIsMounted;
	const { address } = useAccount();
	// const { data: ensAvatar } = useEnsAvatar({ address });
	// const { data: ensName } = useEnsName({ address });
	// const { disconnect } = useDisconnect();

	return (
		<div className="grid justify-center text-center p-8 gap-8">
			{/* <div>
					<img src={ensAvatar} alt="ENS Avatar" />
					<div>{ensName ? `${ensName} (${address})` : address}</div>
					<div>Connected to {connector.name}</div>
					<button className="bg-red-800 p-4 text-white rounded-xl shadow-lg" onClick={disconnect}>
						Disconnect
					</button>
				</div> */}

			<ConnectButton label="Connect Wallet" accountStatus={"full"} chainStatus={"none"} showBalance={false} />

			{mounted ? address && <p className="text-gray-400">My address is {address}</p> : null}
			<SendTransaction />
			<MintNFT />
		</div>
	);

	// return (
	// 	<div className="flex justify-center mx-auto p-8 gap-8">
	// 		{/* {connectors.map((connector) => (
	// 			<button className="bg-blue-800 p-4 text-white rounded-xl shadow-lg" disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
	// 				{connector.name}
	// 				{!connector.ready && " (unsupported)"}
	// 				{isLoading && connector.id === pendingConnector?.id && " (connecting)"}
	// 			</button>
	// 		))}

	// 		{error && <div>{error.message}</div>} */}
	// 	</div>
	// );
}
