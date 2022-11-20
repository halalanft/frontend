import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";

const JoinCommunity = () => {
	return (
		<div className="px-8 py-16  bg-[#F2F2F2]  w-screen">
			<h1 className="text-4xl font-impact mb-8 text-center">Join with Community</h1>
			<p className="mb-16 lg:w-1/2 mx-auto text-center">
				Building NFTs should always be about community. Thus, we are aiming to help the Web3 community with halal ecosystem in the DeFi world. If you want to discuss and chat with us, please follow and join our media below.
			</p>
			<div className="justify-center flex lg:flex-row flex-col gap-5 text-center ">
				<button className=" max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center mb-4">
					<FontAwesomeIcon icon={faDiscord} className="w-8" />
					<strong>DISCORD</strong>
				</button>
				<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center mb-4">
					<FontAwesomeIcon icon={faTwitter} className="w-8" />
					<strong>TWITTER</strong>
				</button>
				<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center mb-4">
					<FontAwesomeIcon icon={faMedium} className="w-8" />
					<strong>MEDIUM</strong>
				</button>
			</div>
		</div>
	);
};

export default JoinCommunity;
