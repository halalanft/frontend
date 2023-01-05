import React from "react";
import Image from "next/image";
import hero from "../assets/concept_art_2.png";
import { ButtonHome, Button } from "./Button";
import Link from "next/link";

const Hero = () => {
	return (
		<div className=" bg-white">
			<div className="px-8 py-16 w-screen layer bg-gradient-to-t from-[rgba(250,208,44,0.92)] to-[rgba(250,208,44,0)]  ">
				<div className="flex flex-col lg:flex-row justify-between items-center">
					<div className="text-center lg:text-left mb-12 lg:mb-0">
						<h1 className="text-5xl lg:text-7xl font-impact mt-4 lg:mt-0 text-[#171717] opacity-[0.68] ">
							The First Halal <br />
							NFTs Collection
						</h1>
						<p className="py-6 font-semibold text-[#171717] opacity-[0.68]">That Brings Sharia Based DeFi Ecosystem.</p>
						<div className="flex flex-col md:flex-row gap-6">
							<ButtonHome name="Download Whitepaper" />
							<Link href="/minting">
								<Button name="Minting Page" />
							</Link>
						</div>
					</div>
					<Image src={hero} alt="Hero" className="lg:max-w-sm rounded-lg w-80 lg:w-96 opacity-50" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
