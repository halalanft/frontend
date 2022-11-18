import React from "react";
import Image from "next/image";
import logo from "../assets/fix.png";

const Navbar = () => {
	return (
		<nav className="flex justify-between px-8  py-6  items-center w-screen">
			<div>
				<Image src={logo} alt="Logo" width={150} className="lg:w-[194px]" />
			</div>
			<div className="hidden space-x-8 lg:flex">
				<a href="#">About</a>
				<a href="#">Why Us</a>
				<a href="#">Concept Art</a>
				<a href="#">Team</a>
				<a href="#">Roadmap</a>
				<a href="#">Community</a>
			</div>
			<div className="flex lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</div>
		</nav>
	);
};

export default Navbar;
