import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter, faMedium } from "@fortawesome/free-brands-svg-icons";

const JoinCommunity = () => {
	return (
		<div id="community" className="px-8 py-16  bg-[#F2F2F2]  w-screen">
			<h1 className="text-4xl font-impact mb-8 text-center text-[#171717] opacity-[0.68] ">Join with Community</h1>
			<p className="mb-16 lg:w-1/2 mx-auto text-center text-[#171717] opacity-[0.68] ">
				Building NFTs should always be about community. Thus, we are aiming to help the Web3 community with halal ecosystem in the DeFi world. If you want to discuss and chat with us, please follow and join our media below.
			</p>
			<div className="justify-center flex md:flex-row flex-col gap-5 text-center ">
				<a className="self-center" href="https://discord.com/invite/be5fnEqrZQ">
					<button className=" max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
						<FontAwesomeIcon icon={faDiscord} className="w-8" />
						<strong>DISCORD</strong>
					</button>
				</a>

				<a className="self-center" href="https://twitter.com/halalanft">
					<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
						<FontAwesomeIcon icon={faTwitter} className="w-[1.6rem]" />
						<strong>TWITTER</strong>
					</button>
				</a>
				<a className="self-center" href="#">
					<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
						<FontAwesomeIcon icon={faMedium} className="w-8" />
						<strong>MEDIUM</strong>
					</button>
				</a>
			</div>
		</div>
	);
};

export default JoinCommunity;
