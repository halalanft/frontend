use super::{Home};
use dominator::{html, Dom};

use std::sync::Arc;

impl Home {
    pub fn render(self: &Arc<Self>) -> Dom {
        let state = self.clone();
        html!("div", {
            .children(&mut [
                self.render_hero(),
                self.render_about(),
                self.render_why(),
                self.render_conceptart(),
                self.render_team(),
                self.render_roadmap(),
                self.render_community(),
            ])
        })
    }

    fn render_hero(self: &Arc<Self>) -> Dom {
        html!("section", {
            .children(&mut [
                html!("div", {
                    .class(["absolute", "w-full", "h-full", "lg:h-screen", "lg:items-center", "lg:flex", "bg-gray-50", "overflow-hidden", "bg-[url(/static/img/hero-bg.png)]", "bg-center", "bg-no-repeat", "bg-cover", "blur-sm", "relative", "z-0"])
                }),
                html!("div", {
                    .class(["absolute", "inset-0", "py-32", "mx-auto", "lg:h-screen", "lg:items-center", "lg:flex", "z-10"])
                    .child(
                        html!("div", {
                            .class(["max-w-xl", "mx-auto", "text-center"])
                            .children(&mut [
                                html!("h1", {
                                    .class(["text-3xl", "text-amber-400", "font-extrabold", "sm:text-5xl"])
                                    .text("Halalan")
                                    .children(&mut [
                                        html!("span", {
                                            .class(["text-halalanft-green"])
                                            .text("ft")
                                        }),
                                        html!("strong", {
                                            .class(["text-base", "font-extrabold", "text-halalanft-green", "sm:block"])
                                            .text("Ethical Society | ")
                                            .child(
                                                html!("span", {
                                                    .class(["text-amber-400"])
                                                    .text("Leap Beyond")
                                                })
                                            )
                                        }),
                                    ])
                                }),
                                html!("p", {
                                    .class(["mt-4", "text-white", "sm:leading-relaxed", "sm:text-xl"])
                                    .text("The First Halal NFTs Collection that Brings Sharia Based DeFi Ecosystem")
                                }),
                                html!("div", {
                                    .class(["flex", "flex-wrap", "justify-center", "gap-4", "mt-8"])
                                    .children(&mut [
                                        self.render_whitepaper(),
                                    ])
                                })
                            ])
                        })
                    )
                })
            ])
        })
    }

    fn render_about(self: &Arc<Self>) -> Dom {
        html!("section", {
            .prop("id","about")
            .class(["bg-gradient-to-r", "from-stone-100", "to-stone-200"])
            .child(
                html!("div", {
                    .class(["max-w-screen-xl", "px-4", "py-16", "mx-auto", "sm:px-6", "lg:px-8"])
                    .child(
                        html!("div", {
                            .class(["grid", "grid-cols-1", "gap-8", "lg:gap-16","lg:grid-cols-2"])
                            .children(&mut [
                                html!("div", {
                                    .class(["relative", "h-64", "overflow-hidden", "rounded-lg", "sm:h-80", "lg:h-full", "lg:order-last"])
                                    .child(
                                        html!("img", {
                                            .class(["absolute", "inset-0", "object-fit", "w-full", "h-full"])
                                            .prop("src", "/static/svg/4.svg")
                                            .prop("alt", "HalalaNFT: Ethics Society | Leap Beyond")
                                        })
                                    )
                                }),
                                html!("div", {
                                    .class(["lg:py-24"])
                                    .children(&mut [
                                        html!("h2", {
                                            .class(["text-3xl", "font-bold", "sm:text-4xl"])
                                            .text("About ")
                                            .children(&mut [
                                                html!("span", {
                                                    .class(["text-amber-400"])
                                                    .text("Halalan")
                                                }),
                                                html!("span", {
                                                    .class(["text-halalanft-green"])
                                                    .text("ft")
                                                })
                                            ])
                                        }),
                                        html!("p", {
                                            .class(["mt-4", "text-gray-600"])
                                            .text("HalalaNFT is an ecosystem that will brings halal perspective as foundation toward the NFTs collection and Decentralized Finance (DeFi) protocol built inside its ecosystem. HalalaNFT is not just a collection of NFTs that we may see in the market at the moment, which most of them have no utility and only take advantage of the temporary hype. Otherwise, HalalaNFT is a long-term NFT project that will benefit the holder beyond enjeying the art of NFT they have purchased")
                                        })
                                    ])
                                })
                            ])
                        })
                    )
                })
            )
        })
    }

    fn render_whitepaper(self: &Arc<Self>) -> Dom {
        html!("a", {
            .class(["block", "w-full", "px-12", "py-3", "text-sm", "font-medium", "text-white", "bg-teal-600", "rounded", "shadow", "sm:w-auto", "active:bg-teal-500", "hover:bg-teal-700", "focus:outline-none", "focus:ring"])
            .prop("href", "/static/docs/english_wp.pdf")
            .prop("target", "_blank")
            .prop("rel", "noopener noreferrer")
            .text("Download Whitepaper")
        })
    }
}
