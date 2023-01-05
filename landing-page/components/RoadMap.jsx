import React from "react";
import Image from "next/image";
import divide from "../assets/divide.png";

const RoadMap = () => {
	return (
		<div id="roadmap" className="px-8 py-16 min-h-screen w-screen bg-[url('../assets/roadmap.png')] lg:bg-cover max-sm:bg-contain">
			<h1 className="text-4xl font-impact mb-8 text-center text-[#171717] opacity-[0.68] ">Roadmap to Halalan Ecosystem</h1>
			<p className="mb-16 text-center lg:w-1/2 mx-auto text-[#171717] opacity-[0.68] ">Our commitment to build Halal ecosystem around DeFi is really strong. We are aiming to have the following roadmap get realized in timely manner</p>

			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68] max-sm:px-16  ">
				<div className="justify-self-end">
					<h1 className="font-impact text-3xl">Q4-2022</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<ol style={{ listStyleType: "number" }}>
						<li>Project Set up</li>
						<li>Whitepaper</li>
						<li>Media Social set up : Discord, Twitter, Medium</li>
						<li>NFTs Concept & Design</li>
						<li>1st AMA</li>
						<li>Pre Launch Project</li>
						<li>Pre Launch Campaign</li>
						<li>Project Launch : NFTs Minting Phase 1 : Public minting.</li>
					</ol>
				</div>
			</div>
			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68] max-sm:px-16   ">
				<div className="justify-self-end ">
					<ol style={{ listStyleType: "number" }}>
						<li>NFT Market Place</li>
						<li>DAO</li>
						<li>Halalan Academy (Bahasa)</li>
						<li>Blockchain Validator : Avalanche</li>
						<li>Halalan Finance (Yield Optimizer)</li>
						<li>Smartcontract Audit</li>
						<li>Halalanft Clothing Brand</li>
						<li>Offchain Business Partnership</li>
					</ol>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h1 className="text-3xl font-impact">2023</h1>
				</div>
			</div>
		</div>
	);
};

export default RoadMap;
