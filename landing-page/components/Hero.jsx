import React from "react";
import Image from "next/image";
import hero from "../assets/concept_art_2.jpg";
import Button from "./Button";

const Hero = () => {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<Image src={hero} className="max-w-sm rounded-lg" />
				<div>
					<h1 className="text-6xl font-impact">The First Halal NFTs Collection</h1>
					<p className="py-6 font-semibold">That Brings Sharia Based DeFi Ecosystem.</p>
					<Button name="Download Whitepaper" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
