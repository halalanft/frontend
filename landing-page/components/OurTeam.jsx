import React from "react";
import CardTeam from "./CardTeam";

const OurTeam = ({ data }) => {
	return (
		<div className="px-8 py-16 min-h-screen w-screen lg:bg-white bg-[url('../assets/ellipse1.png')]">
			<h1 className="text-4xl font-impact mb-8 text-center">Our Team</h1>
			<p className="mb-16 text-center lg:w-1/2 mx-auto">Our team consist of professionals with broad knowledge in both Web2 and Web3 spaces. We are doxxed ourself as a proof of our commitment for this project.</p>
			<div className="gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center">
				{data.map((team, index) => (
					<CardTeam key={index} image={team.image} name={team.name} title={team.title} profile={team.profile} />
				))}
			</div>
		</div>
	);
};

export default OurTeam;
