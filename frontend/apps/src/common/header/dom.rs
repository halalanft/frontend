use std::sync::Arc;

use dominator::{clone, html, Dom, class};
use futures_signals::signal::{Signal, SignalExt};
use strum::IntoEnumIterator;
use crate::utils::routes::{AdminRoute, Route};
use crate::utils::wallet::{WalletStatus, connect, init};
use crate::home::Home;
use crate::common::header::state::Header;
use crate::common::button::{Button, ButtonStyle, ButtonStyleIcon};

use wasm_bindgen::JsValue;
use web_sys::HtmlElement;

use crate::common::header::state::PageLinks;

const STR_HOME: &str = "Sign up";
const STR_DASHBOARD: &str = "Dashboard";
const STR_DOCS: &str = "Docs";

pub fn render(
    state: Arc<Header>
) -> Dom {
    html!("header", {
        .class(["bg-gray-100"])
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
                                    render_button(state.clone()),
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
                .prop("href", PageLinks::Home.route())
                .child(
                    html!("img", {
                        .class(["h-16"])
                        .prop("src", "/public/svg/1.svg")
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
                .class(["flex", "items-center", "gap-6", "text-sm"])
                .children(PageLinks::iter().map(|page_link| {
                    html!("a", {
                        .class(["text-gray-500", "transition", "hover:text-gray-500/75"])
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

fn render_button(state: Arc<Header>) -> Dom {
    html!("div", {
        .class(["flex", "items-center", "gap-4"])
        .child(
            html!("div", {
                .class(["sm:gap-4", "sm:flex"])
                .child_signal(state.app.storage.wallet.connection.signal_ref(clone!(state => move |connection| {
                    Some(if connection == &WalletStatus::Disconnected {
                        let style = ButtonStyle::Icon(ButtonStyleIcon::Metamask);
                        let button = Button::new_label(style, String::from("connect"), clone!(state => move || {
                            connect();
                            
                        }));
                        Button::render(button, ["px-5","py-2.5","text-sm","font-medium","text-white","bg-teal-600","rounded-md","shadow"])
                    } else {
                        let style = ButtonStyle::Icon(ButtonStyleIcon::Metamask);
                        let button = Button::new_label(style, String::from("disconnect"), clone!(state => move || {
                            
                        }));
                        Button::render(button, ["px-5","py-2.5","text-sm","font-medium","text-white","bg-teal-600","rounded-md","shadow"])
                    })
                })))
            })
        )
    })
}