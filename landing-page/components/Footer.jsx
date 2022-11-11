import React from "react";
import Image from "next/image";
import logo from "../assets/black.png";

const Footer = () => {
	return (
		<footer className="footer items-center px-8 py-14 bg-[#FAD02C] justify-between">
			<div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
				<Image src={logo} width={280} alt="Logo" />
			</div>
			<div className="items-center grid-flow-col">
				<p className="font-semibold">Copyright © 2022 - All right reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
