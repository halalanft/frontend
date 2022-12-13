import React from "react";
import Navbar from "../minting/components/Navbar";
import Connect from "./components/Connect";

const MintingPage = () => {
	return (
		<div className="bg overflow-hidden">
			<Navbar />
			<Connect />
		</div>
	);
};

export default MintingPage;
