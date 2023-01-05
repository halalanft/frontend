import React, { useState } from "react";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";
import SmartContract from "./components/SmartContract";
import WalletCard from "./components/WalletCard";

const Dashboard = () => {
	const [accounts, setAccounts] = useState([]);

	return (
		<div className="bg-white w-full h-screen">
			<NavBar accounts={accounts} setAccounts={setAccounts} />
			<WalletCard />
			<SmartContract />
			<MainMint accounts={accounts} setAccounts={setAccounts} />
		</div>
	);
};

export default Dashboard;
