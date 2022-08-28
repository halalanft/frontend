use super::Home;
use dominator::{html, Dom, svg};

use std::sync::Arc;

impl Home {
    pub fn render_why(self: &Arc<Self>) -> Dom {
        html!("section", {
            .class(["text-zinc-800","bg-gradient-to-r", "from-stone-100", "to-stone-200"])
            .prop("id", "whyus")
            .child(
                html!("div", {
                    .class(["max-w-screen-xl","px-4","py-16", "mx-auto", "sm:px-6","lg:px-8"])
                    .children([
                        html!("div", {
                            .class("max-w-xl")
                            .children([
                                html!("h2", {
                                    .class(["text-3xl","font-bold","sm:text-4xl"])
                                    .text("What makes ")
                                    .children(&mut [
                                        html!("span", {
                                            .class("text-amber-400")
                                            .text("Halalan")
                                        }),
                                        html!("span", {
                                            .class(["text-halalanft-green"])
                                            .text("ft ")
                                        }),
                                        html!("span", {
                                            .text("special")
                                        })
                                    ])
                                }),
                                html!("p", {
                                    .class(["mt-4","text-zinc-800"])
                                    .text("We focus on 6 things that will be long-term fundamentals of this project, and we call it: House of HalalaNFT Strategy. HalalaNFT will build a halal ecosystem that focuses on providing ultimate NFTs use cases or utilities so that it has real benefits for holders.")
                                }),
                            ])
                        }),
                        html!("div", {
                            .class(["grid","grid-cols-1","gap-8","mt-8","md:gap-12","md:mt-16","md:grid-cols-2","lg:grid-cols-3"])
                            .children([
                                html!("div", {
                                    .class(["flex","items-start"])
                                    .children([
                                        html!("span", {
                                            .class(["flex-shrink-0","p-4","bg-gradient-to-r", "from-sky-600", "to-sky-800","rounded-lg"])
                                            .child(
                                                svg!("svg", {
                                                    .class(["w-5","h-5"])
                                                    .attr("fill", "none")
                                                    .attr("stroke", "white")
                                                    .attr("viewBox", "0 0 24 24")
                                                    .attr("xmlns", "http://www.w3.org/2000/svg")
                                                    .children([
                                                        svg!("path", {
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("stroke-linecap", "round")
                                                            .attr("stroke-linejoin", "round")
                                                            .attr("stroke-width", "2")
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222")
                                                        }),
                                                    ])
                                                })
                                            )
                                        }),
                                        html!("div", {
                                            .class("ml-4")
                                            .children([
                                                html!("h2", {
                                                    .class(["text-lg","font-bold"])
                                                    .text("Halal")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-sm","text-zinc-800"])
                                                    .text("We aimed for every halal aspect in developing and delivering our product. We seek for halal guidance and certification for Islamic scholars to ensure our NFT holder be comfortable with every protocol project and revenue streams that we develop.")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["flex","items-start"])
                                    .children([
                                        html!("span", {
                                            .class(["flex-shrink-0","p-4","bg-gradient-to-r", "from-sky-600", "to-sky-800","rounded-lg"])
                                            .child(
                                                svg!("svg", {
                                                    .class(["w-5","h-5"])
                                                    .attr("fill", "none")
                                                    .attr("stroke", "white")
                                                    .attr("viewBox", "0 0 24 24")
                                                    .attr("xmlns", "http://www.w3.org/2000/svg")
                                                    .children([
                                                        svg!("path", {
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("stroke-linecap", "round")
                                                            .attr("stroke-linejoin", "round")
                                                            .attr("stroke-width", "2")
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222")
                                                        }),
                                                    ])
                                                })
                                            )
                                        }),
                                        html!("div", {
                                            .class("ml-4")
                                            .children([
                                                html!("h2", {
                                                    .class(["text-lg","font-bold"])
                                                    .text("Security")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-sm","text-zinc-800"])
                                                    .text("Security is our top priority for develop and deliver HalalaNFT Web3 product. We aimed to seek every security certification as possible to ensure our code is well-written and meet high standards in the Web3 spaces.")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["flex","items-start"])
                                    .children([
                                        html!("span", {
                                            .class(["flex-shrink-0","p-4","bg-gradient-to-r", "from-sky-600", "to-sky-800","rounded-lg"])
                                            .child(
                                                svg!("svg", {
                                                    .class(["w-5","h-5"])
                                                    .attr("fill", "none")
                                                    .attr("stroke", "white")
                                                    .attr("viewBox", "0 0 24 24")
                                                    .attr("xmlns", "http://www.w3.org/2000/svg")
                                                    .children([
                                                        svg!("path", {
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("stroke-linecap", "round")
                                                            .attr("stroke-linejoin", "round")
                                                            .attr("stroke-width", "2")
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222")
                                                        }),
                                                    ])
                                                })
                                            )
                                        }),
                                        html!("div", {
                                            .class("ml-4")
                                            .children([
                                                html!("h2", {
                                                    .class(["text-lg","font-bold"])
                                                    .text("Philanthropy")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-sm","text-zinc-800"])
                                                    .text("This is something that other Web3 project is missing. HalalaNFT, as one of the halal project will have philanthropy activities to support wide community (e.g. scholarship for islamic boarding school, web3 project to support muslim community, etc).")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["flex","items-start"])
                                    .children([
                                        html!("span", {
                                            .class(["flex-shrink-0","p-4","bg-gradient-to-r", "from-sky-600", "to-sky-800", "rounded-lg"])
                                            .child(
                                                svg!("svg", {
                                                    .class(["w-5","h-5"])
                                                    .attr("fill", "none")
                                                    .attr("stroke", "white")
                                                    .attr("viewBox", "0 0 24 24")
                                                    .attr("xmlns", "http://www.w3.org/2000/svg")
                                                    .children([
                                                        svg!("path", {
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("stroke-linecap", "round")
                                                            .attr("stroke-linejoin", "round")
                                                            .attr("stroke-width", "2")
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222")
                                                        }),
                                                    ])
                                                })
                                            )
                                        }),
                                        html!("div", {
                                            .class("ml-4")
                                            .children([
                                                html!("h2", {
                                                    .class(["text-lg","font-bold"])
                                                    .text("Revenue Stream")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-sm","text-zinc-800"])
                                                    .text("Unlike many NFTs projects that are present in the market today, Halalanft will become an ecosystem that has its own revenue stream for products or services to be provided. Halalanft will manage on chain & off chain & off chain revenue stream.")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                                html!("div", {
                                    .class(["flex","items-start"])
                                    .children([
                                        html!("span", {
                                            .class(["flex-shrink-0","p-4","bg-gradient-to-r", "from-sky-600", "to-sky-800","rounded-lg"])
                                            .child(
                                                svg!("svg", {
                                                    .class(["w-5","h-5"])
                                                    .attr("fill", "none")
                                                    .attr("stroke", "white")
                                                    .attr("viewBox", "0 0 24 24")
                                                    .attr("xmlns", "http://www.w3.org/2000/svg")
                                                    .children([
                                                        svg!("path", {
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("d", "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z")
                                                        }),
                                                        svg!("path", {
                                                            .attr("stroke-linecap", "round")
                                                            .attr("stroke-linejoin", "round")
                                                            .attr("stroke-width", "2")
                                                            .attr("d", "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222")
                                                        }),
                                                    ])
                                                })
                                            )
                                        }),
                                        html!("div", {
                                            .class("ml-4")
                                            .children([
                                                html!("h2", {
                                                    .class(["text-lg","font-bold"])
                                                    .text("Decentralized Autonomous Organization (DAO)")
                                                }),
                                                html!("p", {
                                                    .class(["mt-1","text-sm","text-zinc-800"])
                                                    .text("HalalaNFT is about community as any other Web3 project and depend on the loyalty and dedication from the community. Therefore, we will have DAO to support every proposal made by community and prioritize it as per vote decision.")
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
