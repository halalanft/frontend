import React from "react";

const Navbar = () => {
	return (
		<div className="navbar bg-slate-100">
			<div className="flex-1">
				<img src="../assets/fida.jpg" width="194px" height="56px" alt="logo" />
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li>
						<a>About</a>
					</li>
					<li>
						<a>Why Us</a>
					</li>
					<li>
						<a>Concept Art</a>
					</li>
					<li>
						<a>Team</a>
					</li>
					<li>
						<a>Roadmap</a>
					</li>
					<li>
						<a>Community</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
