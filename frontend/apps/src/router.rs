use crate::common::{footer, header};
use crate::home::Home;
use crate::utils::futures::AsyncLoader;
use crate::utils::storage::AppStorage;

use crate::utils::language::{Language, LanguageCode, LanguageName};
use crate::utils::lightning::LightningMode;
use crate::utils::routes::{HomeRoute, Route};
use dominator::{html, Dom};
use futures_signals::signal::Signal;
use std::sync::Arc;

pub struct Router {
    pub loader: AsyncLoader,
    pub language: Language,
    pub mode: LightningMode,
    pub storage: AppStorage,
}

impl Router {
    pub fn new() -> Arc<Self> {
        Arc::new(Self {
            loader: AsyncLoader::new(),
            language: Language(LanguageCode::En, LanguageName::English),
            mode: LightningMode::Light,
            storage: AppStorage::new(),
        })
    }

    pub fn render(state: Arc<Self>) -> Dom {
        html!("div", {
            .children(&mut [
                html!("div", {
                    .class(["block", "top-0", "sticky", "z-50"])
                    .child(
                        header::render(Arc::new(header::Header::new(state.clone())))
                    )
                }),
                html!("main", {
                    .class(["relative"])
                    .child_signal(Self::dom_signal(state))
                }),
                html!("div", {
                    .child(
                        footer::render()
                    )
                }),
            ])
        })
    }

    fn dom_signal(state: Arc<Self>) -> impl Signal<Item = Option<Dom>> {
        dominator::routing::url().signal_ref(move |url| {
            let route = Route::from_url(url);
            match route {
                Route::Home(route) => match route {
                    HomeRoute::Home => Some(Arc::new(Home::new(state.clone())).render()),
                },
                _ => None,
            }
        })
    }
}
