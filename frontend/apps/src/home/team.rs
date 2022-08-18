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
                                    .class(["p-12", "bg-gradient-to-r", "from-slate-600", "to-slate-700", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/public/img/fida.jpeg")
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
                                    .class(["p-12", "bg-gradient-to-r", "from-slate-600", "to-slate-700", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/public/img/iwan.jpeg")
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
                                                    .text("Iwan loves blockchain and cryptocurrencies, especially NFT. He has broad experience in business development in the Web3 spaces")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-slate-600", "to-slate-700", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/public/img/rama.jpeg")
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
                                                    .text("Rama's project management skill is a top-notch. He is able to manage several project at once and build a high level quality result. Rama will help the project to achieve all feature listed in the Halalanft roadmap. He is also fluent in Arabic and English.")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["p-12", "bg-gradient-to-r", "from-slate-600", "to-slate-700", "rounded-lg"])
                                    .children([
                                        html!("img", {
                                            .attr("src", "/public/img/andika.jpeg")
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
