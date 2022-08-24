use super::Home;
use dominator::{html, Dom};

use std::sync::Arc;

impl Home {
    pub fn render_roadmap(self: &Arc<Self>) -> Dom {
        html!("div", {
            .class(["bg-gradient-to-r", "from-slate-600", "to-slate-700"])
            .child(
                html!("div", {
                    .class(["relative","wrap","overflow-hidden","p-14","h-full","max-w-7xl","m-auto"])
                    .children([
                        html!("div", {
                            .class(["max-w-xl","mx-auto", "text-center", "p-12", "text-stone-100","text-opacity-100","text-base"])
                            .children([
                                html!("h2", {
                                    .class(["text-4xl","font-bold","tracking-tight","sm:text-5xl"])
                                    .text("Roadmap to Halalan Ecosystem")
                                }),
                                html!("p", {
                                    .class(["max-w-lg","mx-auto","mt-4","text-gring-offset-warm-gray-500"])
                                    .text("Our commitment to build Halal ecosystem around DeFi is really strong. We are aiming to have the following roadmap get realized in timely manner")
                                }),
                            ])
                        }),
                        html!("div", {
                            .class(["mb-8","flex","justify-between","flex-row-reverse","items-center","w-full","left-timeline"])
                            .children([
                                html!("div", {
                                    .class(["hidden","sm:flex","order-1","w-5/12"])
                                }),
                                html!("div", {
                                    .class(["hidden","sm:flex","order-2"])
                                    .children([
                                        html!("div", {
                                            .class(["flex","items-center","ml-4","absolute","bg-gradient-to-br", "from-amber-200", "to-amber-400", "w-px", "h-1/2"])
                                        }),
                                        html!("div", {
                                            .class(["hidden","sm:flex","z-20","items-center","order-1","w-8","h-8","rounded-full","shadow-primary-main"])
                                            .attr("style", "background: linear-gradient(97.93deg, rgb(255, 234, 161) 0%, rgb(255, 204, 21) 63.99%); box-shadow: rgb(255, 234, 161) 0px 0px 32px;")
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["order-3","bg-gradient-to-r", "from-stone-100", "to-stone-200","rounded-lg","shadow-xl","w-full","sm:w-5/12","p-8"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/icons/roadmap-1.png")
                                            .attr("alt", "Roadmap Q2 2022")
                                            .class(["w-6","h-6","mb-3","aspect-square"])
                                        }),
                                        html!("h3", {
                                            .class(["mb-3","font-bold","text-amber-400","text-3xl"])
                                            .text("Q3 2022")
                                        }),
                                        html!("p", {
                                            .class(["leading-snug","tracking-wide","text-primary-main","text-opacity-100","text-base"])
                                            .children(&mut [
                                                html!("p", {
                                                    .text("1. Project setup")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("2. Publish Whitepaper")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("3. Setup media social")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("4. Project launch")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("5. NFTs Concept & Design")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("6. Pre-launch")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("7. Pre-launch")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("8. Pre-launch")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                            ])
                        }),
                        html!("div", {
                            .class(["mb-8","flex","justify-between","items-center","w-full","right-timeline"])
                            .children([
                                html!("div", {
                                    .class(["hidden","sm:flex","order-1","w-5/12"])
                                }),
                                html!("div", {
                                    .class(["hidden","sm:flex","order-2"])
                                    .children([
                                        html!("div", {
                                            .class(["flex","items-center","ml-4","absolute","bg-gradient-to-br", "from-amber-200", "to-amber-400","w-px","h-1/2"])
                                        }),
                                        html!("div", {
                                            .class(["hidden","sm:flex","z-20","items-center","order-1","w-8","h-8","rounded-full","shadow-primary-main", "bg-gradient-to-br", "from-amber-200", "to-amber-400", "shadow-lg", "shadow-amber-500/40"])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["order-3","bg-gradient-to-br","from-stone-100", "to-stone-200","rounded-lg","shadow-xl","w-full","sm:w-5/12","p-8"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/icons/roadmap-2.png")
                                            .attr("alt", "Road Map 02")
                                            .class(["w-6","h-6","mb-3","aspect-square"])
                                        }),
                                        html!("h3", {
                                            .class(["mb-3","font-bold","text-amber-400","text-3xl"])
                                            .text("Q4 2022")
                                        }),
                                        html!("p", {
                                            .class(["leading-snug","tracking-wide","text-primary-main","text-opacity-100","text-base"])
                                            .children(&mut [
                                                html!("p", {
                                                    .text("1. Project Launch: NFTs minting phase 1")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("2. NFT Marketplace")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("3. Yield Farming")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("4. Halal Audit")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("5. Smart Contract Audit")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("6. Philanthrophy 1st initial action")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("7. Halalanft clothing brand")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("8. Halalanft Finance (yield optimizer)")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                            ])
                        }),
                        html!("div", {
                            .class(["mb-8","flex","justify-between","flex-row-reverse","items-center","w-full","left-timeline"])
                            .children([
                                html!("div", {
                                    .class(["hidden","sm:flex","order-1","w-5/12"])
                                }),
                                html!("div", {
                                    .class(["hidden","sm:flex","order-2"])
                                    .children([
                                        html!("div", {
                                            .class(["flex","items-center","ml-4", "bg-gradient-to-br", "absolute","from-amber-200", "to-amber-400","w-px","h-1/2"])
                                        }),
                                        html!("div", {
                                            .class(["hidden","sm:flex","z-20","items-center","order-1","w-8","h-8","rounded-full","shadow-primary-main"])
                                            .attr("style", "background: linear-gradient(97.93deg, rgb(255, 234, 161) 0%, rgb(255, 204, 21) 63.99%); box-shadow: rgb(255, 234, 161) 0px 0px 32px;")
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["order-3","bg-gradient-to-r","from-stone-100", "to-stone-200","rounded-lg","shadow-xl","w-full","sm:w-5/12","p-8"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/icons/roadmap-3.png")
                                            .attr("alt", "Road Map 03")
                                            .class(["w-6","h-6","mb-3","aspect-square"])
                                        }),
                                        html!("h3", {
                                            .class(["mb-3","font-bold","text-amber-400","text-3xl"])
                                            .text("2023")
                                        }),
                                        html!("p", {
                                            .class(["leading-snug","tracking-wide","text-primary-main","text-opacity-100","text-base"])
                                            .children(&mut [
                                                html!("p", {
                                                    .text("1. Strengthen security of Halalanft projects")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("2. Delegate and/or validator")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("3. Setup DAO")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("4. offchain business partnership")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("5. Decentralized Exchange (DEX)")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("6.Issuing collaterized stablecoin lain")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("7. Halalanft chain")
                                                }),
                                                html!("br",{}),
                                                html!("p", {
                                                    .text("8. halalan token")
                                                }),
                                                
                                            ])
                                        }),
                                    ])
                                }),
                            ])
                        }),
                    ])
                })
            )
        })
    }
}