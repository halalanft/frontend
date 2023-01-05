import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../assets/fix.png";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const handleClick = () => {
		setNav(!nav);
	};

	return (
		<nav className="shadow-lg  flex  px-8  py-6  items-center w-screen ">
			<div className="mr-12">
				<Image src={logo} alt="Logo" width={150} className="lg:w-[194px]" />
			</div>
			{/* menu */}

			<ul className="hidden md:flex space-x-8">
				<li className="text-[#171717] opacity-[0.68]">
					<Link href="/Home" className="hover:text-[#FAD02C] cursor-pointer">
						Home
					</Link>
				</li>
				<li className="text-[#171717] opacity-[0.68]">
					<Link href="/minting/pages/dashboard" className="hover:text-[#FAD02C] cursor-pointer">
						Dashboard
					</Link>
				</li>
			</ul>

			{/* hamburger */}
			<div className={nav ? "md:hidden z-50 text-white" : "md:hidden z-50"} onClick={handleClick}>
				{!nav ? <FaBars /> : <FaTimes />}
			</div>
			{/* mobile menu */}

			<ul className={!nav ? "hidden" : "absolute top-0 left-0 w-full h-screen  flex flex-col justify-center items-center bg-[#374C8C] z-20"}>
				<li className="py-6 text-2xl text-white">
					<Link href="/" className="hover:text-[#374C8C] cursor-pointer">
						Home
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link href="/minting" className="hover:text-[#374C8C] cursor-pointer">
						Mint
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
