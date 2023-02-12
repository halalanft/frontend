import React from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

export default function MintNFT() {
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: "0xd3f9D5e2D0C43B4094d80D1213B44D4F63399C66",
		abi: [
			{
				name: "mint",
				type: "function",
				stateMutability: "nonpayable",
				inputs: [],
				outputs: [],
			},
		],
		functionName: "mint",
	});

	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});
	return (
		<div>
			<button disabled={!write} onClick={() => write?.()} className="bg-blue-800 p-4 text-white rounded-xl shadow-lg">
				{isLoading ? "Minting..." : "Mint"}
			</button>
			{isSuccess && (
				<div className="text-gray-900">
					Successfully minted your NFT!
					<div>
						<a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
					</div>
				</div>
			)}
			{(isPrepareError || isError) && <div>Error: {(prepareError || error)?.message}</div>}
		</div>
	);
}
