use super::Home;
use dominator::{html, Dom};

use std::sync::Arc;

impl Home {
    pub fn render_community(self: &Arc<Self>) -> Dom {
        html!("section", {
            .prop("id", "community")
            .class(["bg-gradient-to-r", "from-stone-100", "to-stone-200"])
            .child(
                html!("div", {
                    .class(["p-6","py-10","sm:py-20"])
                    .child(
                        html!("div", {
                            .class(["rounded-lg","overflow-hidden","max-w-5xl","m-auto","p-12","sm:p-16","text-center", "bg-gradient-to-l", "from-stone-200", "to-stone-300"])
                            .children([
                                html!("h2", {
                                    .class(["text-2xl","font-bold","sm:text-3xl","md:text-5xl","text-primary-main","mb-8"])
                                    .text("Join with Community")
                                }),
                                html!("p", {
                                    .class(["text-primary-main","max-w-xl","mx-auto","mb-8"])
                                    .text("Building NFTs should always be about community. Thus, we are aiming to help the Web3 community with halal ecosystem in the DeFi world. If you want to discuss and chat with us, please follow and join our media below.")
                                }),
                                html!("div", {
                                    .class(["grid","grid-cols-1","sm:grid-cols-3","gap-4","max-w-xl","mx-auto"])
                                    .children([
                                        html!("a", {
                                            .class(["primary-button","inline-flex","items-center","justify-center","px-8","py-3","text-black","border","border-transparent","shadow-","rounded-2xl","undefined", "bg-gradient-to-r", "from-teal-500", "to-teal-600", "text-stone-50", "hover:bg-gradient-to-r", "hover:from-teal-400", "hover:to-teal-500"])
                                            .prop("href", "https://discord.gg/be5fnEqrZQ")
                                            .prop("target", "_blank")
                                            .prop("rel", "noopener noreferrer")
                                            .children([
                                                html!("span", {
                                                    .class(["mr-4"])
                                                    .text("Discord")
                                                }),
                                                html!("img", {
                                                    .attr("src", "/static/icons/discord.png")
                                                    .attr("alt", "Discord")
                                                }),
                                            ])
                                        }),
                                        html!("a", {
                                            .class(["primary-button","inline-flex","items-center","justify-center","px-8","py-3","text-black","border","border-transparent","shadow-","rounded-2xl","undefined", "bg-gradient-to-r", "from-teal-500", "to-teal-600", "text-stone-50", "hover:bg-gradient-to-r", "hover:from-teal-400", "hover:to-teal-500"])
                                            .prop("href", "https://twitter.com/halalanft")
                                            .prop("target", "_blank")
                                            .prop("rel", "noopener noreferrer")
                                            .children([
                                                html!("span", {
                                                    .class("mr-4")
                                                    .text("Twitter")
                                                }),
                                                html!("img", {
                                                    .attr("src", "/static/icons/twitter.png")
                                                    .attr("alt", "Twitter")
                                                }),
                                            ])
                                        }),
                                        html!("button", {
                                            .class(["primary-button","inline-flex","items-center","justify-center","px-8","py-3","text-black","border","border-transparent","shadow-","rounded-2xl","undefined","bg-gradient-to-r", "from-teal-500", "to-teal-600", "text-stone-50", "hover:bg-gradient-to-r", "hover:from-teal-400", "hover:to-teal-500"])
                                            .prop("href", "https://medium.com/@halalanft.ecos")
                                            .prop("target", "_blank")
                                            .prop("rel", "noopener noreferrer")
                                            .children([
                                                html!("span", {
                                                    .class("mr-4")
                                                    .text("Medium")
                                                }),
                                                html!("img", {
                                                    .attr("src", "/static/icons/medium.png")
                                                    .attr("alt", "Medium")
                                                }),
                                            ])
                                        }),
                                    ])
                                }),
                            ])
                        })
                    )
                })
            )
        })
    }
}