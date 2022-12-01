import React from "react";
import Image from "next/image";
import divide from "../assets/divide.png";

const RoadMap = () => {
	return (
		<div id="roadmap" className="px-8 py-16 min-h-screen w-screen bg-[url('../assets/roadmap.png')] lg:bg-cover max-sm:bg-contain">
			<h1 className="text-4xl font-impact mb-8 text-center">Roadmap to Halalan Ecosystem</h1>
			<p className="mb-16 text-center lg:w-1/2 mx-auto">Our commitment to build Halal ecosystem around DeFi is really strong. We are aiming to have the following roadmap get realized in timely manner</p>

			<div className="grid grid-cols-3 items-center">
				<div className="justify-self-end">
					<h1 className="font-impact text-3xl">Q3 2022</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={10} />
				</div>
				<div className="justify-self-start">
					<ol style={{ listStyleType: "number" }}>
						<li>Project setup</li>
						<li>Whitepaper</li>
						<li>Social media setup: Discord, Twitter, Medium</li>
						<li>NFTs Concept & Design</li>
						<li>Pre-launch Project</li>
						<li>Pre-launch Campaign</li>
						<li>Whitelisting</li>
						<li>VCs package offering</li>
						<li>1st AMA</li>
					</ol>
				</div>
			</div>
			<div className="grid grid-cols-3 items-center  ">
				<div className="justify-self-end">
					<ol style={{ listStyleType: "number" }}>
						<li>Project Launch: NFTs minting phase 1: Whitelist & VC minting, public minting.</li>
						<li>NFT Marketplace</li>
						<li>Yield Farming (onchain investment)</li>
						<li>Halal Audit (certification)</li>
						<li>Marketplace Audit</li>
						<li>Philanthrophy 1st action</li>
						<li>Halalanft clothing brand</li>
						<li>Halalanft Finance (yield optimizer)</li>
					</ol>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={10} />
				</div>
				<div className="justify-self-start">
					<h1 className="text-3xl font-impact">Q4 2022</h1>
				</div>
			</div>

			<div className="grid grid-cols-3 items-center  ">
				<div className="justify-self-end">
					<h1 className="text-3xl font-impact">2023</h1>
				</div>
				<div className="justify-self-center">
					<Image src={divide} alt="divide" width={10} />
				</div>
				<div className="justify-self-start">
					<ol style={{ listStyleType: "number" }}>
						<li>Strengthen security of Halala NFT Marketplace & Halalan Finance</li>
						<li>Delegate and/or Run Validator</li>
						<li>Setup DAO</li>
						<li>Offchain Business Partnership</li>
						<li>Decentralized Exchange (DEX)</li>
						<li>Halalanft clothing brand</li>
						<li>Halalan chain</li>
						<li>Real-world use case for Halalan chain</li>
						<li>Halalan token</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default RoadMap;
