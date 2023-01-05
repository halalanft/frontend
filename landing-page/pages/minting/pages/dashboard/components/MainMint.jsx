import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import halalanft from "../../../../../contracts/Halalanft.json";

const halalanftAddress = "0x16Dde40EE5B11c5478C16a708a020ceb8CE5bD3d";

const MainMint = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	const handleMint = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(halalanftAddress, halalanft.abi, signer);

			try {
				const response = await contract.mint(BigNumber.from(mintAmount), { value: ethers.utils.parseEther((0.02 * mintAmount).toString()) });
				console.log("response: ", response);
			} catch (err) {
				console.log("error: ", err);
			}
		}
	};

	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};
	const handleIncrement = () => {
		if (mintAmount >= 3) return;
		setMintAmount(mintAmount + 1);
	};

	return (
		<div>
			<h1>MainMint</h1>
			{isConnected ? (
				<div>
					<div>
						<button className="bg-teal-500 text-white" onClick={handleDecrement}>
							-
						</button>
						<input type="number" value={mintAmount} />
						<button className="bg-teal-500 text-white" onClick={handleIncrement}>
							+
						</button>
					</div>
					<button className="bg-teal-500 text-white" onClick={handleMint}>
						Mint Now
					</button>
				</div>
			) : (
				<p className="text-black">You must be connected to mint</p>
			)}
		</div>
	);
};

export default MainMint;
