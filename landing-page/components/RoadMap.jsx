import React from "react";
import Image from "next/image";
import divide from "../assets/divide.png";

const RoadMap = () => {
	return (
		<div id="roadmap" className="px-8 py-16 min-h-screen w-screen bg-[url('../assets/roadmap.png')] lg:bg-cover max-sm:bg-contain">
			<h1 className="text-4xl font-impact mb-8 text-center text-[#171717] opacity-[0.68] ">Roadmap to Halalan Ecosystem</h1>
			<p className="mb-16 text-center lg:w-1/2 mx-auto text-[#171717] opacity-[0.68] ">Our commitment to build Halal ecosystem around DeFi is really strong. We are aiming to have the following roadmap get realized in timely manner</p>

			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68] ">
				<div className="justify-self-end">
					<h1 className="font-impact text-3xl">October 2022</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h2 className="text-xl font-bold mb-2">Preparation</h2>
					<ol style={{ listStyleType: "number" }}>
						<li>Whitepaper</li>
						<li>Media social set up</li>
						<li>NFTs Concept & Design</li>
						<li>1st AMA</li>
						<li>Landing Page, Minting page</li>
					</ol>
				</div>
			</div>
			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68]   ">
				<div className="justify-self-end">
					<h2 className="text-xl font-bold mb-2">Project Launch & Development</h2>
					<ol style={{ listStyleType: "number" }}>
						<li>Public Minting</li>
						<li>Marketing Campaign</li>
						<li>NFT Marketplace & Audit DAO</li>
						<li>Avalanche Validator, Farming, & Trading</li>
						<li>Clothing Brand</li>
					</ol>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h1 className="text-3xl font-impact">January 2023</h1>
				</div>
			</div>

			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68]   ">
				<div className="justify-self-end">
					<h1 className="text-3xl font-impact">March 2023</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h2 className="text-xl font-bold mb-2">Yield Optimizer & Academy</h2>
					<ol style={{ listStyleType: "number" }}>
						<li>Yield Optimizer: test Net, Main Net</li>
						<li>Smartcontract Audit</li>
						<li>Academy (LMS) DApps</li>
						<li>Ecosystem Dashboard</li>
					</ol>
				</div>
			</div>
			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68]   ">
				<div className="justify-self-end">
					<h2 className="text-xl font-bold mb-2">Expansion</h2>
					<ol style={{ listStyleType: "number" }}>
						<li>Multichain Yield Optimizer</li>
						<li>Validator Expansion</li>
						<li>Off-Chain Business Funding</li>
					</ol>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h1 className="text-3xl font-impact">May 2023</h1>
				</div>
			</div>

			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68]   ">
				<div className="justify-self-end">
					<h1 className="text-3xl font-impact">July 2023</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h2 className="text-xl font-bold mb-2">Sustainability</h2>
					<ol style={{ listStyleType: "number" }}>
						<li>Security Enhancement</li>
						<li>More research & academy content</li>
					</ol>
				</div>
			</div>
			<div className="grid grid-cols-3 items-center text-[#171717] opacity-[0.68]   ">
				<div className="justify-self-end">
					<h2 className="text-xl font-bold mb-2">Continous Improvement</h2>
					<ol style={{ listStyleType: "number" }}>
						{/* <li>Multichain Yield Optimizer</li>
						<li>Validator Expansion</li>
						<li>Off-Chain Business Funding</li> */}
					</ol>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={14} />
				</div>
				<div className="justify-self-start">
					<h1 className="text-3xl font-impact">September 2023</h1>
				</div>
			</div>
		</div>
	);
};

export default RoadMap;
