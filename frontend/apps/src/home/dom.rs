use dominator::{clone, html, Dom};
use futures_signals::signal::SignalExt;
use super::Home;
use crate::{router::Router, common::header, utils::routes::{Route, HomeRoute, DocsRoute}};

use std::sync::Arc;

impl Home {
    pub fn render(self: &Arc<Self>) -> Dom {
        let state = self.clone();
        html!("div", {
            .children(&mut [
                self.render_hero(),
                self.render_showcase(),
                self.render_about(),
                self.render_roadmap(),
                self.render_community(),
                self.render_team(),
                self.render_newsletter(),
            ])
        })
    }
    
    fn render_hero(self: &Arc<Self>) -> Dom {
        html!("section", {
            .class(["bg-gray-50", "overflow-hidden", "bg-[url(/public/img/hero-bg.jpg)]", "bg-center", "bg-no-repeat", "bg-cover"])
            .child(
                html!("div", {
                    .class(["max-w-screen-xl", "px-4", "py-32", "mx-auto", "lg:h-screen", "lg:items-center", "lg:flex"])
                    .child(
                        html!("div", {
                            .class(["max-w-xl", "mx-auto", "text-center"])
                            .children(&mut [
                                html!("h1", {
                                    .class(["text-3xl","text-amber-400", "font-extrabold", "sm:text-5xl"])
                                    .text("Halala")
                                    .children(&mut [
                                        html!("span", {
                                            .class(["text-emerald-400"])
                                            .text("NFT")
                                        }),
                                        html!("strong", {
                                            .class(["text-base", "font-extrabold", "text-emerald-500", "sm:block"])
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
                                    .class(["mt-4", "sm:leading-relaxed", "sm:text-xl"])
                                    .text("The first NFT aiming for halal ecosystem inside Decentralized Finance world.")
                                }),
                                html!("div", {
                                    .class(["flex", "flex-wrap", "justify-center", "gap-4", "mt-8"])
                                    .children(&mut [
                                        self.render_docs(),
                                        self.render_whitepaper()
                                    ])
                                })
                            ])
                        })
                    )
                })
            )  
        })
    }

    fn render_showcase(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("showcase")
                })
            ])
            
        })
    }

    fn render_about(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("about")
                })
            ])
            
        })
    }

    fn render_roadmap(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("roadmap")
                })
            ])
            
        })
    }

    fn render_community(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("community")
                })
            ])
            
        })
    }

    fn render_newsletter(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("newsletter")
                })
            ])
            
        })
    }

    fn render_team(self: &Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .text("team")
                })
            ])
            
        })
    }
    
    fn render_docs(self: &Arc<Self>) -> Dom {
        html!("a", {
            .class(["block", "w-full", "px-12", "py-3", "text-sm", "font-medium", "text-white", "bg-teal-600", "rounded", "shadow", "sm:w-auto", "active:bg-teal-500", "hover:bg-teal-700", "focus:outline-none", "focus:ring"])
            .prop("href", Route::Home(HomeRoute::Home).to_string())
            .text("Read Docs")
        })
    }
    
    fn render_whitepaper(self: &Arc<Self>) -> Dom {
        html!("a", {
            .class(["block", "w-full", "px-12", "py-3", "text-sm", "font-medium", "text-teal-600", "rounded", "shadow", "sm:w-auto", "hover:text-teal-700", "active:text-teal-500", "focus:outline-none", "focus:ring"])
            .prop("href", Route::Docs(DocsRoute::Docs).to_string())
            .text("Download Whitepaper")
        })
    }
    
}
