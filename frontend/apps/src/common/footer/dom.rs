use dominator::{html, Dom};

pub fn render() -> Dom {
    html!("footer", {
        .class(["bg-gradient-to-r", "from-slate-600", "to-slate-700"])
        .child(
            html!("div", {
                .class(["max-w-screen-xl", "px-4", "py-8", "mx-auto", "sm:px-6", "lg:px-8"])
                .child(
                    html!("div", {
                        .class(["sm:flex", "sm:items-center", "sm:justify-between"])
                        .children(&mut [
                            html!("div", {
                                .class(["flex", "justify-center", "text-teal-600", "sm:justify-start"])
                                .child(
                                    html!("img", {
                                        .class(["w-48", "object-fit"])
                                        .prop("src", "/public/svg/4.svg")
                                        .prop("alt", "HalalaNFT: Ethics Society | Leap Beyond")
                                    })
                                )
                            }),
                            html!("p", {
                                .class(["mt-4", "text-sm", "text-center", "text-white", "lg:text-right", "lg:mt-0"])
                                .text("Copyright 2022. All rights reserved.")
                            })
                        ])
                    })
                )
            })
        )
    })
}
