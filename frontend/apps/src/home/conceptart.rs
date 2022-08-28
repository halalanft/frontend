use super::Home;
use dominator::{html, Dom};

use std::sync::Arc;

impl Home {
    pub fn render_conceptart(self: &Arc<Self>) -> Dom {
        html!("section", {
            .prop("id", "art")
            .child(
                html!("div", {
                    .class(["bg-gradient-to-r", "from-stone-100", "to-stone-200", "px-4","py-8","mx-auto","max-w-screen-2xl","sm:px-6","lg:px-8"])
                    .child(
                        html!("div", {
                            .class(["grid","grid-cols-1","gap-4","md:grid-cols-2"])
                            .children([
                                html!("div", {
                                    .class(["p-8","bg-gradient-to-r", "from-slate-600", "to-slate-700","md:p-12","lg:px-16","lg:py-24","md:order-last"])
                                    .child(
                                        html!("div", {
                                            .class(["max-w-xl","mx-auto","text-center"])
                                            .children([
                                                html!("h2", {
                                                    .class(["text-2xl","font-bold","text-white","md:text-3xl"])
                                                    .text("We bring a very high quality NFTs to your collection")
                                                }),
                                                html!("p", {
                                                    .class(["hidden","sm:block","sm:mt-4","text-white/90"])
                                                    .text("Our NFTs are painted with high-quality design in mind for maximum satisfaction to our holders.")
                                                }),
                                            ])
                                        })
                                    )
                                }),
                                html!("div", {
                                    .class(["grid","grid-cols-2","gap-4","md:grid-cols-1","lg:grid-cols-2"])
                                    .children([
                                        html!("img", {
                                            .attr("alt", "concept art")
                                            .attr("src", "/static/img/concept_art_1.jpg")
                                            .class(["object-cover","w-full","h-40","sm:h-56","md:h-full"])
                                        }),
                                        html!("img", {
                                            .attr("alt", "coloring art")
                                            .attr("src", "/static/img/concept_art_2.jpg")
                                            .class(["object-cover","w-full","h-40","sm:h-56","md:h-full"])
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
