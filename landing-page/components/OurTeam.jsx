import React from "react";
import CardTeam from "./CardTeam";

const OurTeam = () => {
	const OurTeam = [
		{
			image: "fida",
			name: "Fida Munadzir",
			title: "Sharia Compliance Advisor",
			profile: "Fida Munadzir is a well-known islamic scholar in Indonesia. He has written 3 (three) books related to Islamic perspective on blockchain and cryptocurrencies",
		},
		{
			image: "iwan",
			name: "Iwan",
			title: "Co-Founder & Business Development",
			profile:
				"Iwan is a Halal Web3 enthusiast, he has broad experience in business management and supply chain. Recently, he has interested in exploring crypto space especially in DeFi, NFT, and Tokenomics. Halalanft is his first project in the web3 space, and he believe Halalanft will be the first Halal NFT project that will bring long term benefit for Web3 communities globally",
		},
		{
			image: "rama",
			name: "Rama",
			title: "Lead Operation",
			profile:
				"More than 10 years of experience in diverse organizations and communities, both in national and international level, engaging and connecting people from various background, supported his knowledge of project management, surely help him to manage several projects related to Halalanft",
		},
		{
			image: "andika",
			name: "Andika",
			title: "Co-Founder & Lead Developer",
			profile: "After several years working on blockchain and Web3 projects, Riyan realize that Web3 space need halal ecosystem to attract Muslim community to this emerging technology.",
		},
		{
			image: "mirzam",
			name: "Mirzam Avicena",
			title: "UI/UX Designer",
			profile:
				"Muslim graphic designer with more than 2 years experience. His passion is in ui/ux design and development. Together with his expertise and our resource, halalanft will become the best halal ecosystem by providing user experience and user interface to the protocol as well as its utility project",
		},
	];
	return (
		<div id="team" className="px-8 py-16 min-h-screen w-screen bg-white bg-[url('../assets/ellipse1.png')]">
			<h1 className="text-4xl font-impact mb-8 text-center text-[#171717] opacity-[0.68]">Our Team</h1>
			<p className="mb-16 text-center lg:w-1/2 mx-auto text-[#171717] opacity-[0.68] ">
				Our team consist of professionals with broad knowledge in both Web2 and Web3 spaces. We are doxxed ourself as a proof of our commitment for this project.
			</p>
			<div className="gap-5 grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center">
				{OurTeam && OurTeam.map((team, index) => <CardTeam key={index} image={team.image} name={team.name} title={team.title} profile={team.profile} />)}
			</div>
		</div>
	);
};

export default OurTeam;
