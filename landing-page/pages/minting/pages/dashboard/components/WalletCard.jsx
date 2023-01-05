import React, { useState } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask !== "undefined") {
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((result) => {
					accountChangedHandler(result[0]);
					setConnButtonText("Wallet Connected");
					getAccountBalance(result[0]);
				})
				.catch((err) => {
					setErrorMessage(err.message);
				});
		} else {
			setErrorMessage("Please install MetaMask browser extension to interact");
		}
	};

	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	};

	const getAccountBalance = (address) => {
		window.ethereum
			.request({ method: "eth_getBalance", params: [address, "latest"] })
			.then((balance) => {
				setUserBalance(ethers.utils.formatEther(balance));
			})
			.catch((err) => {
				setErrorMessage(err.message);
			});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	};

	//   window.ethereum.on('accountsChanged', accountChangedHandler);
	//   window.ethereum.on('chainChanged', chainChangedHandler);

	return (
		<div className="border rounded-md p-4 bg-white text-[#2b2b2b]">
			<h4>{"Connection to metamask using window.ethereum methods"}</h4>
			<button className="btn bg-[#374C8C] m-1 text-white" onClick={connectWalletHandler}>
				{connButtonText}
			</button>
			<div className="accountDisplay">
				<h3>address: {defaultAccount}</h3>
			</div>
			<div className="balanceDisplay">
				<h3>Balance : {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
};

export default WalletCard;
