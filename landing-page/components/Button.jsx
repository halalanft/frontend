import React from "react";

const ButtonHome = ({ name }) => {
	return (
		<div className="dropdown dropdown-bottom">
			<label tabIndex={0} className="btn bg-[#374C8C] m-1 text-white">
				{name}
			</label>
			<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
				<li className="text-[#171717] opacity-[0.68]">
					<a href="https://drive.google.com/file/d/1IFQS6WDDJk0--Smi2SOknkprZ9IkR5bZ/view?usp=sharing">Whitepaper in english</a>
				</li>
				<li className="text-[#171717] opacity-[0.68]">
					<a href="https://drive.google.com/file/d/177PwCBsXzZsDv2M2Rr1o4KMH4EByveY5/view?usp=sharing">Whitepaper in bahasa</a>
				</li>
			</ul>
		</div>
	);
};
const Button = ({ name }) => {
	return (
		<div className="dropdown dropdown-bottom">
			<label tabIndex={0} className="btn bg-[#374C8C] m-1 text-white">
				{name}
			</label>
		</div>
	);
};

export { ButtonHome, Button };
