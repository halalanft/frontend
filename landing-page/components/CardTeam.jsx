import React from "react";

const CardTeam = ({ name, title, profile }) => {
	return (
		<div className="card  mx-auto bg-base-100 shadow-xl">
			<div className="card-body items-center text-center">
				<h3 className="card-title">{name}</h3>
				<h6>{title}</h6>
				<p className="text-sm">{profile}</p>
			</div>
		</div>
	);
};

export default CardTeam;
