import React from "react";

const ButtonHome = ({ name }) => {
	return (
		<div className="dropdown dropdown-bottom">
			<label tabIndex={0} className="btn bg-[#374C8C] m-1">
				{name}
			</label>
			<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<a>Whitepaper in english</a>
				</li>
				<li>
					<a>Whitepaper in bahasa</a>
				</li>
			</ul>
		</div>
	);
};
const Button = ({ name }) => {
	return (
		<div className="dropdown dropdown-bottom">
			<label tabIndex={0} className="btn bg-[#374C8C] m-1">
				{name}
			</label>
		</div>
	);
};

export { ButtonHome, Button };
