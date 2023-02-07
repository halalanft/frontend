import React from "react";
import Navbar from "../minting/components/Navbar";
import Minting from "./components/Minting";

const MintingPage = () => {
	return (
		<div className="bg overflow-hidden">
			<Navbar />
			<Minting />
		</div>
	);
};

export default MintingPage;
