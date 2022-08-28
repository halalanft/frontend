use super::Home;
use dominator::{html, Dom};

use std::sync::Arc;

impl Home {
    pub fn render_team(self: &Arc<Self>) -> Dom {
        html!("section", {
            .class(["bg-gradient-to-r", "from-stone-100", "to-stone-200"])
            .prop("id","team")
            .child(
                html!("div", {
                    .class(["max-w-screen-xl","px-4","py-16","mx-auto","sm:px-6","lg:px-8","sm:py-24"])
                    .children([
                        html!("div", {
                            .class(["max-w-xl","mx-auto","text-center"])
                            .children([
                                html!("h2", {
                                    .class(["text-4xl","font-bold","tracking-tight","sm:text-5xl"])
                                    .text("Our Team")
                                }),
                                html!("p", {
                                    .class(["max-w-lg","mx-auto","mt-4","text-gring-offset-warm-gray-500"])
                                    .text("Our team consist of professionals with broad knowledge in both Web2 and Web3 spaces. We are doxxed ourself as a proof of our commitment for this project.")
                                }),
                            ])
                        }),
                        html!("div", {
                            .class(["grid","grid-cols-1","gap-8","mt-16","sm:grid-cols-2","lg:grid-cols-2","sm:gap-16"])
                            .children([
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-sky-600", "to-sky-800", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/img/fida.jpeg")
                                            .attr("alt", "")
                                            .class(["object-cover","w-24","h-24","mx-auto","rounded-full","shadow-xl"])
                                        }),
                                        html!("blockquote", {
                                            .class(["flex","flex-col","justify-between","p-12","-mt-6","text-center","rounded-lg","shadow-xl"])
                                            .children([
                                                html!("p", {
                                                    .class(["text-lg","font-bold","text-stone-100"])
                                                    .text("Fida Munadzir")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-xs","font-medium","text-amber-400"])
                                                    .text("Sharia Compliance Advisor")
                                                }),
                                                html!("p", {
                                                    .class(["mt-4","text-sm","text-stone-100"])
                                                    .text("Fida Munadzir is a well-known islamic scholar in Indonesia. He has written 3 (three) books related to Islamic perspective on blockchain and cryptocurrencies")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-sky-600", "to-sky-800", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/img/iwan.jpeg")
                                            .attr("alt", "")
                                            .class(["object-cover","w-24","h-24","mx-auto","rounded-full","shadow-xl"])
                                        }),
                                        html!("blockquote", {
                                            .class(["flex","flex-col","justify-between","p-12","-mt-6","text-center","rounded-lg","shadow-xl"])
                                            .children([
                                                html!("p", {
                                                    .class(["text-lg","font-bold","text-stone-100"])
                                                    .text("Iwan")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-xs","font-medium","text-amber-400"])
                                                    .text("Co Founder & Business Development")
                                                }),
                                                html!("p", {
                                                    .class(["mt-4","text-sm","text-stone-100"])
                                                    .text("Iwan is a Halal Web3 enthusiast, he has broad experience in business management and supply chain. Recently, he's interested in exploring crypto space especially in DeFi, NFT, and Tokenomics. Halalanft is his first project in the web3 space, and he believe Halalanft will be the first Halal NFT project that will bring long term benefit for Web3 communities globally")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-sky-600", "to-sky-800", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/img/rama.jpeg")
                                            .attr("alt", "")
                                            .class(["object-cover","w-24","h-24","mx-auto","rounded-full","shadow-xl"])
                                        }),
                                        html!("blockquote", {
                                            .class(["flex","flex-col","justify-between","p-12","-mt-6","text-center","rounded-lg","shadow-xl"])
                                            .children([
                                                html!("p", {
                                                    .class(["text-lg","font-bold","text-stone-100"])
                                                    .text("Rama")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-xs","font-medium","text-amber-400"])
                                                    .text("Lead Operation")
                                                }),
                                                html!("p", {
                                                    .class(["mt-4","text-sm","text-stone-100"])
                                                    .text("More than 10 years of experience in diverse organizations and communities, both in national and international level, engaging and connecting people from various background, supported his knowledge of project management, surely help him to manage several projects related to Halalanft")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-sky-600", "to-sky-800", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/static/img/andika.jpeg")
                                            .attr("alt", "")
                                            .class(["object-cover","w-24","h-24","mx-auto","rounded-full","shadow-xl"])
                                        }),
                                        html!("blockquote", {
                                            .class(["flex","flex-col","justify-between","p-12","-mt-6","text-center","rounded-lg","shadow-xl"])
                                            .children([
                                                html!("p", {
                                                    .class(["text-lg","font-bold","text-stone-100"])
                                                    .text("Riyan")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-xs","font-medium","text-amber-400"])
                                                    .text("Lead Developer")
                                                }),
                                                html!("p", {
                                                    .class(["mt-4","text-sm","text-stone-100"])
                                                    .text("After several years working on blockchain and Web3 projects, Riyan realize that Web3 space need halal ecosystem to attract Muslim community to this emerging technology.")
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
