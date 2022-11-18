import React from "react";

const CardSpecial = ({ id, icon, title, description }) => {
	return (
		<div className="card  mx-auto bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default CardSpecial;
