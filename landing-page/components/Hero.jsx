import React from "react";
import Image from "next/image";
import hero from "../assets/concept_art_2.jpg";
import { ButtonHome } from "./Button";

const Hero = () => {
	return (
		<div className="px-8 py-16 min-h-screen w-screen layer bg-gradient-to-t from-[rgba(250,208,44,0.92)] to-[rgba(250,208,44,0)]  ">
			<div className="flex flex-col lg:flex-row justify-between items-center">
				<div className="text-center lg:text-left mb-12 lg:mb-0">
					<h1 className="text-5xl lg:text-7xl font-impact mt-4 lg:mt-0 ">
						The First Halal <br />
						NFTs Collection
					</h1>
					<p className="py-6 font-semibold">That Brings Sharia Based DeFi Ecosystem.</p>
					<ButtonHome name="Download Whitepaper" />
				</div>
				<Image src={hero} alt="Hero" className="lg:max-w-sm rounded-lg w-80 lg:w-96 -z-10 " />
			</div>
		</div>
	);
};

export default Hero;
