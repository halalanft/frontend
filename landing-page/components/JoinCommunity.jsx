import React from "react";
import Button from "./Button";

const JoinCommunity = () => {
	return (
		<div className="px-8 py-16 bg-[#F2F2F2] min-h-screen">
			<h1 className="text-4xl font-impact mb-8 text-center">Join with Community</h1>
			<p className="mb-16 w-1/2 mx-auto text-center">
				Building NFTs should always be about community. Thus, we are aiming to help the Web3 community with halal ecosystem in the DeFi world. If you want to discuss and chat with us, please follow and join our media below.
			</p>
			<div className="justify-center flex gap-5">
				<Button name="Discord" />
				<Button name="Twitter" />
				<Button name="Medium" />
			</div>
		</div>
	);
};

export default JoinCommunity;
