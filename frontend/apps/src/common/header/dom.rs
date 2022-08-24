use std::sync::Arc;

use crate::common::header::state::Header;
use dominator::{html, Dom};
use strum::IntoEnumIterator;

use crate::common::header::state::PageLinks;

const STR_HOME: &str = "Sign up";
const STR_DASHBOARD: &str = "Dashboard";
const STR_DOCS: &str = "Docs";

pub fn render(state: Arc<Header>) -> Dom {
    html!("header", {
        .class(["bg-gradient-to-r", "from-stone-100", "to-stone-200", "sticky", "top-0", "z-100"])
        .child(
            html!("div", {
                .class(["max-w-screen-xl", "px-4", "mx-auto", "sm:px-6", "lg:px-8"])
                .child(
                    html!("div", {
                        .class(["flex", "items-center", "justify-between", "h-16"])
                        .children(&mut [
                            render_logo(),
                            html!("div", {
                                .class(["md:flex", "md:items-center", "md:gap-12"])
                                .children(&mut [
                                    render_navbar(),
                                ])
                            }),

                        ])
                    })
                )
            })
        )
    })
}

fn render_logo() -> Dom {
    html!("div", {
        .class(["flex-l", "md:flex", "md:items-center", "md:gap-12"])
        .child(
            html!("a", {
                .prop("href", PageLinks::About.route())
                .child(
                    html!("img", {
                        .class(["h-24"])
                        .prop("src", "/static/svg/1.svg")
                    })
                )
            })
        )
    })
}

fn render_navbar() -> Dom {
    html!("nav", {
        .class(["hidden", "md:block"])
        .children(&mut [
            html!("h2", {
                .class(["sr-only"])
                .text("Header navigation")
            }),
            html!("ul", {
                .class(["flex", "items-center", "gap-6", "text-md"])
                .children(PageLinks::iter().map(|page_link| {
                    html!("a", {
                        .class(["text-zinc-800", "transition", "hover:text-emerald-500"])
                        .prop("kind", page_link.kind_str())
                        .prop("href", &page_link.route())
                        .prop("icon", "icon")
                        .text(page_link.kind_str())
                    })
                }))
            }),
        ])
    })
}
