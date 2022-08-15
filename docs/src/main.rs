use std::{fs, path::Path};

use pulldown_cmark::{html, Parser};

fn main() {
    // let mut buffer = String::new();
    let markdown_str = fs::read_to_string(Path::new(&String::from("./markdown/toc.md"))).unwrap();
    let parser = Parser::new(String::as_str(&markdown_str));
    let mut html_buf = String::new();
    html::push_html(&mut html_buf, parser);
    println!("{}", html_buf);
}
