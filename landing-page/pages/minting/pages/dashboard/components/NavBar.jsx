import React from "react";

const NavBar = ({ accounts, setAccounts }) => {
	const isConnected = Boolean(accounts[0]);

	const connectAccount = async () => {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccounts(accounts);
		}
	};

	return (
		<div>
			{isConnected ? (
				<p className="text-black">connected</p>
			) : (
				<button className="bg-teal-500 text-white" onClick={connectAccount}>
					Connect
				</button>
			)}
		</div>
	);
};

export default NavBar;
