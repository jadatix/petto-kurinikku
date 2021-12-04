use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Service {
  pub id: String,
  pub name: String,
  pub description: String,
  pub price: u8
}