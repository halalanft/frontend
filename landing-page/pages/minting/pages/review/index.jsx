import React from "react";
import Image from "next/image";
import hero from "../../../../assets/concept_art_2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter, faMedium } from "@fortawesome/free-brands-svg-icons";
import Navbar from "../../components/Navbar";

const Review = () => {
	return (
		<div className="bg overflow-hidden">
			<Navbar />
			<div className="px-8">
				<div className="flex justify-center my-6">
					<h1 className="font-impact text-[3rem]">Mint</h1>
				</div>

				<div className="h-[560px] bg-white rounded-lg shadow-lg mx-auto ">
					<section className="flex justify-between">
						<div className="py-8 px-14 flex justify-items-center  space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white ">1</p>
								</div>
							</div>
							<div>
								<div className="text-xl font-semibold ">CONNECT</div>
								<p className="text-slate-500">wallet and check network</p>
							</div>
						</div>
						<div className="py-8 px-14 flex justify-items-center space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white ">2</p>
								</div>
							</div>
							<div>
								<div className="text-xl font-semibold ">CHECKOUT</div>
								<p className="text-slate-500">quality and mint</p>
							</div>
						</div>
						<div className="py-8 px-14 flex justify-items-center space-x-4">
							<div className="shrink-0">
								<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
									<p className="self-center items-center text-white ">3</p>
								</div>
							</div>
							<div>
								<div className="text-xl font-semibold ">REVIEW</div>
								<p className="text-slate-500">reciept</p>
							</div>
						</div>
					</section>
					<div className="h-[2px] bg-[#171717] opacity-30"></div>

					<section id="review" className="py-10">
						<div className="flex flex-row px-14 justify-around">
							<div className="flex flex-col ">
								<Image src={hero} alt="Hero" className="lg:max-w-sm rounded-lg w-56 lg:w-80 border" />
							</div>

							<div className="flex flex-col space-y-4">
								<p className="font-bold text-[1.4rem] mb-8">Hala#3442</p>
								<p className="italic text-[1.4rem]">0 Optimistic Bunnies</p>
								<hr />
								<p className="italic text-[1.4rem]">0 Pixelated Bunnies</p>
								<hr />
								<p className="italic text-[1.4rem]">Specialized content in Discord server</p>
								<hr />
								<p className="italic text-[1.4rem]">Access to future airdrops</p>
							</div>
						</div>
					</section>
				</div>
			</div>
			<section id="footer" className="py-14">
				<div className="justify-center flex md:flex-row flex-col gap-5 text-center ">
					<a className="self-center" href="https://discord.com/invite/be5fnEqrZQ">
						<button className=" max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faDiscord} className="w-8" />
							<strong>DISCORD</strong>
						</button>
					</a>

					<a className="self-center" href="https://twitter.com/halalanft">
						<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faTwitter} className="w-[1.6rem]" />
							<strong>TWITTER</strong>
						</button>
					</a>
					<a className="self-center" href="#">
						<button className="max-sm:w-40 px-4 py-2 gap-2 bg-[#374C8C] hover:bg-[#283765] text-white rounded-md flex items-center justify-center self-center mb-4">
							<FontAwesomeIcon icon={faMedium} className="w-8" />
							<strong>MEDIUM</strong>
						</button>
					</a>
				</div>
				<div className="text-center pt-6">
					<p className="font-semibold">Copyright © 2022 - All right reserved</p>
				</div>
			</section>
		</div>
	);
};

export default Review;
