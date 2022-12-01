import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/fix.png";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const handleClick = () => {
		setNav(!nav);
	};

	return (
		<nav className="sticky top-0 left-0 bg-white opacity-70 flex justify-between px-8  py-6  items-center w-screen ">
			<div>
				<Image src={logo} alt="Logo" width={150} className="lg:w-[194px]" />
			</div>
			{/* menu */}

			<ul className="hidden md:flex space-x-8">
				<li>
					<Link to="about" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						About
					</Link>
				</li>
				<li>
					<Link to="why us" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						Why Us
					</Link>
				</li>
				<li>
					<Link to="concept art" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						Concept Art
					</Link>
				</li>
				<li>
					<Link to="team" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						Team
					</Link>
				</li>
				<li>
					<Link to="roadmap" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						Roadmap
					</Link>
				</li>
				<li>
					<Link to="community" smooth={true} duration={500} className="hover:text-[#FAD02C] cursor-pointer">
						Community
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
					<Link to="about" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						About
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link to="why us" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						Why Us
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link to="concept art" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						Concept Art
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link to="team" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						Team
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link to="roadmap" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						Roadmap
					</Link>
				</li>
				<li className="py-6 text-2xl text-white">
					<Link to="community" smooth={true} duration={500} className="hover:text-[#374C8C] cursor-pointer">
						Community
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
