import React from "react";
import Image from "next/image";

const CardTeam = ({ image, name, title, profile }) => {
	return (
		<div className="card  mx-auto bg-white shadow-xl">
			<div className="card-body items-center text-center ">
				<Image src={require("../assets/" + image + ".png")} alt={image} width={80} className="block mx-auto rounded-full sm:mx-0 sm:shrink-0" />
				<p className="card-title text-xl text-[#171717] opacity-[0.68]">{name}</p>
				<h6 className="text-[#FAD02C]">
					<strong>{title}</strong>
				</h6>
				<p className="text-sm text-[#171717] opacity-[0.68]">{profile}</p>
			</div>
		</div>
	);
};

export default CardTeam;
