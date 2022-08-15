use dominator::{html, Dom};

pub fn render() -> Dom {
    html!("footer", {
        .child(html!("div", {
            .text("FOOTER")
        }))
    })
}