import React from "react";
import Image from "next/image";
import logo from "../assets/fix.png";

const About = () => {
	return (
		<div id="about" className="px-8 py-16 lg:flex flex-row lg:justify-between w-screen bg-white">
			<div className="lg:w-[40rem] ">
				<h1 className="text-4xl font-impact mb-8 text-[#171717] opacity-[0.68]">
					About <span className="text-[#FAD02C]">Halalanft</span>
				</h1>
				<p className="text-[#171717] opacity-[0.68]">
					Halalanft is a <strong>community NFT collection</strong> of halal Web3 enthusiasts, which will bring halal perspective as the main foundation for NFT and DeFi protocols to be built in the ecosystem. Halalanft is not just a
					collection of NFTs that we may see in the market at the moment, most of them have no utility and only take advantage of the temporary hype. Halalanft is a long-term NFT project that will give benefits to the holder beyond enjoying
					the art of NFT they have purchased.
				</p>
			</div>
			<div className="lg:self-end mt-8">
				<Image src={logo} width={200} alt="Logo" className="lg:w-[280px]" />
			</div>
		</div>
	);
};

export default About;
