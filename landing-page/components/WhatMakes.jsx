import React from "react";
import CardSpecial from "./CardSpecial";

const WhatMakes = ({ data }) => {
	return (
		<div className="px-8 py-16 bg-[#F2F2F2] min-h-screen">
			<h1 className="text-4xl font-impact mb-8">
				What makes <span className="text-[#FAD02C]">Halalanft</span> special
			</h1>
			<p className="italic mb-16 w-1/2">
				We focus on 5 things that will be long-term fundamentals of this project, and we call it: House of Halalanft Strategy. Halalanft will build a halal ecosystem that focuses on providing ultimate NFTs use cases or utilities so that it
				has real benefits for holders.
			</p>
			<div className="gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
				{data.map((special) => (
					<CardSpecial id={special.id} icon={special.icon} title={special.title} description={special.description} />
				))}
			</div>
		</div>
	);
};

export default WhatMakes;
