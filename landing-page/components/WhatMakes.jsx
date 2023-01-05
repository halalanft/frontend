import React from "react";
import CardSpecial from "./CardSpecial";

const WhatMakes = () => {
	const SpecialCard = [
		{
			icon: "halal",
			title: "Halal",
			description:
				"In developing and delivering our product, we focused on every halal aspect. We seek halal guidance and certification for Islamic scholars to ensure our NFT holders are comfortable with every protocol project and revenue stream that we develop.",
		},
		{
			icon: "security",
			title: "Security",
			description: "Security is our top priority when we develop and deliver Halalanft Web3 products. We aimed to obtain every possible security certification to ensure that our code is well-written and meets high Web3 standards. ",
		},
		{
			icon: "philanthropy",
			title: "Philanthropy",
			description:
				"This is something that other Web3 projects are missing. As one of the halal projects, Halalanft will have philanthropic activities to support a broad community (for example, scholarships for Islamic boarding schools, a Web3 project to support the Muslim community, and so on). ",
		},
		{
			icon: "stream",
			title: "Revenue Stream",
			description:
				"Unlike many NFT projects present in the market today, Halalanft will become an ecosystem with its own revenue stream for products or services to be provided. Halalanft will be in charge of both the on-chain and off-chain revenue streams. ",
		},
		{
			icon: "people",
			title: "DAO",
			description:
				"Halalanft is about community, as any other Web3 project, and depends on the loyalty and dedication of the community. Therefore, we will give NFT holders special access rights to some educational materials and voting rights to submit proposals and vote on proposed proposals.",
		},
	];

	return (
		<div id="why us" className="px-8 py-16 bg-[#F2F2F2] min-h-full w-screen">
			<h1 className="text-4xl font-impact mb-8 text-[#171717] opacity-[0.68]">
				What makes <span className="text-[#FAD02C]">Halalanft</span> special
			</h1>
			<p className="italic mb-16 lg:w-1/2 text-[#374C8C]">
				We focus on 5 things that will be the long-term fundamentals of this project, and we call them : House of Halalanft Strategy. Halalanft will create a halal ecosystem focused on providing ultimate NFT use cases or utilities in order
				to provide real benefits to holders.
			</p>
			<div className="gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{SpecialCard && SpecialCard.map((special, index) => <CardSpecial key={index} icon={special.icon} title={special.title} description={special.description} />)}
			</div>
		</div>
	);
};

export default WhatMakes;
