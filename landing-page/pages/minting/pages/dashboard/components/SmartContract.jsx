import { ethers } from "ethers";
import { useState } from "react";

function SmartContract() {
	const { ethereum } = typeof window !== "undefined";
	let [account, setAccount] = useState("");
	let [contractData, setContractData] = useState("");

	// const connectMetamask = async () => {
	// 	if (typeof window.ethereum !== "undefined") {
	// 		const accounts = await ethereum.request({
	// 			method: "eth_requestAccounts",
	// 		});
	// 		setAccount(accounts[0]);
	// 	}
	// };

	let contract;
	const connectContract = async () => {
		const Address = "0xCf88d5AaaE4AeC6bB1bB601dDE60983cE71A4c01";
		const ABI = [
			{
				inputs: [],
				name: "myFlower",
				outputs: [
					{
						internalType: "string",
						name: "",
						type: "string",
					},
				],
				stateMutability: "view",
				type: "function",
			},
		];
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		contract = new ethers.Contract(Address, ABI, signer);
		console.log(contract.address);
	};

	const getData = async () => {
		const phrase = await contract.myFlower();
		setContractData(phrase);
	};

	return (
		<div className="App">
			{/* <button className="btn bg-[#374C8C] m-1 text-white" onClick={connectMetamask}>
				CONNECT TO METAMASK
			</button> */}
			<p>{account}</p>
			<br />
			<br />
			<button className="btn bg-[#374C8C] m-1 text-white" onClick={connectContract}>
				CONNECT TO CONTRACT
			</button>{" "}
			<br />
			<br />
			<button className="btn bg-[#374C8C] m-1 text-white" onClick={getData}>
				READ FROM CONTRACT
			</button>
			<p>{contractData}</p>
		</div>
	);
}
export default SmartContract;
