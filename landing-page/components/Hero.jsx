import React from "react";

const Hero = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
				<div>
					<h1 className="text-5xl font-impact">The First Halal NFTs Collection</h1>
					<p className="py-6 font-semibold">That Brings Sharia Based DeFi Ecosystem.</p>
					<button className="btn btn-primary">Downloads Whitepaper</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
