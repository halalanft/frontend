import React from "react";
import Image from "next/image";

const CardSpecial = ({ icon, title, description }) => {
	return (
		<div className="card mx-auto bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">
					<div className="bg-[#374C8C] w-10 h-10 rounded-md shadow-lg inline-flex items-center justify-center p-2">
						<Image src={require("../assets/" + icon + ".svg")} alt={icon} width={20} className="self-center items-center " />
					</div>
					{title}
				</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default CardSpecial;
