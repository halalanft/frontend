import React from "react";
import Image from "next/image";
import logo from "../assets/fix.png";

const Navbar = () => {
	return (
		// <div classNameName="navbar bg-slate-100">
		// 	<div className="flex-1">
		// 		<img src="../assets/fida.jpg" width="194px" height="56px" alt="logo" />
		// 	</div>
		// 	<div className="flex-none">
		// 		<ul className="menu menu-horizontal p-0">
		// 			<li>
		// 				<a>About</a>
		// 			</li>
		// 			<li>
		// 				<a>Why Us</a>
		// 			</li>
		// 			<li>
		// 				<a>Concept Art</a>
		// 			</li>
		// 			<li>
		// 				<a>Team</a>
		// 			</li>
		// 			<li>
		// 				<a>Roadmap</a>
		// 			</li>
		// 			<li>
		// 				<a>Community</a>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </div>
		<nav className="container flex justify-between px-4 py-6 mx-auto items-center">
			<div>
				<Image src={logo} width={194} alt="Logo" />
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
