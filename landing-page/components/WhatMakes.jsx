import React from "react";
import CardSpecial from "./CardSpecial";

const WhatMakes = () => {
	const SpecialCard = [
		{
			icon: "halal",
			title: "Halal",
			description:
				"We aimed for every halal aspect in developing and delivering our product. We seek for halal guidance and certification for Islamic scholars to ensure our NFT holder be comfortable with every protocol project and revenue streams that we develop.",
		},
		{
			icon: "security",
			title: "Security",
			description: "Security is our top priority for develop and deliver Halalanft Web3 product. We aimed to seek every security certification as possible to ensure our code is well-written and meet high standards in the Web3 spaces.",
		},
		{
			icon: "philanthropy",
			title: "Philanthropy",
			description:
				"This is something that other Web3 project is missing. Halalanft, as one of the halal project will have philanthropy activities to support wide community (e.g. scholarship for islamic boarding school, web3 project to support muslim community, etc).",
		},
		{
			icon: "stream",
			title: "Revenue Stream",
			description:
				"Unlike many NFTs projects that are present in the market today, Halalanft will become an ecosystem that has its own revenue stream for products or services to be provided. Halalanft will manage on chain & off chain revenue stream.",
		},
		{
			icon: "people",
			title: "Hala Club & DAO",
			description:
				"Halalanft is about community, as any other Web3 project, and depends on the loyalty and dedication of the community. Therefore, we will make NFT holders have special access rights to some educational materials and voting rights to submit proposals and vote on proposed proposals.",
		},
	];

	return (
		<div id="why us" className="px-8 py-16 bg-[#F2F2F2] min-h-full w-screen">
			<h1 className="text-4xl font-impact mb-8 text-[#171717] opacity-[0.68]">
				What makes <span className="text-[#FAD02C]">Halalanft</span> special
			</h1>
			<p className="italic mb-16 lg:w-1/2 text-[#374C8C]">
				We focus on 5 things that will be long-term fundamentals of this project, and we call it: House of Halalanft Strategy. Halalanft will build a halal ecosystem that focuses on providing ultimate NFTs use cases or utilities so that it
				has real benefits for holders.
			</p>
			<div className="gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{SpecialCard && SpecialCard.map((special, index) => <CardSpecial key={index} icon={special.icon} title={special.title} description={special.description} />)}
			</div>
		</div>
	);
};

export default WhatMakes;
