import React from "react";
import Image from "next/image";
import logo from "../assets/fix.png";

const About = () => {
	return (
		<div className="px-8 py-16 flex flex-row justify-between w-full">
			<div className="lg:w-[40rem] w-96">
				<h1 className="text-4xl font-impact mb-8">
					About <span className="text-[#FAD02C]">Halalanft</span>
				</h1>
				<p>
					Halalanft is an ecosystem that will brings halal perspective as foundation toward the NFTs collection and DeFi protocol that will build in the ecosystem. Halalanft is not just a collection of NFTs that we may see in the market at
					the moment, which most of them have no utility and only take advantage of the temporary hype. Otherwise, Halalanft is a long-term NFT project that will give benefit to the holder beyond enjoying the art of NFT they have purchased.
				</p>
			</div>
			<div className="self-end ">
				<Image src={logo} width={280} alt="Logo" />
			</div>
		</div>
	);
};

export default About;
