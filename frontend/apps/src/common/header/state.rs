use std::sync::Arc;

use crate::{
    router::Router,
    utils::routes::{AboutRoute, Route},
};
use strum_macros::{EnumIter};

pub struct Header {
    pub app: Arc<Router>,
}

impl Default for Header {
    fn default() -> Self {
        Self::new(Router::new())
    }
}

impl Header {
    pub fn new(app: Arc<Router>) -> Self {
        Self { app }
    }
}

#[derive(Clone, Debug, PartialEq, EnumIter)]
pub enum PageLinks {
    About,
    Why,
    Team,
}

impl PageLinks {
    pub fn kind_str(&self) -> &'static str {
        match self {
            Self::About => "about",
            Self::Why => "why us",
            Self::Team => "team",
        }
    }
    pub fn route(&self) -> String {
        match self {
            Self::About => Route::About(AboutRoute::About).to_string(),
            Self::Why => String::from("/#whyus"),
            Self::Team => String::from("/#team"),
        }
    }
}
