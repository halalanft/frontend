import React from "react";
import Navbar from "../minting/components/Navbar";
import Connect from "./components/Connect";
import Checkout from "./components/Checkout";

const MintingPage = () => {
	return (
		<div className="bg overflow-hidden">
			<Navbar />
			{/* <Connect /> */}
			<Checkout />
		</div>
	);
};

export default MintingPage;
