use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Doctor {
  pub id: String,
  pub img: String,
  pub spec: String,
  pub name: String,
  pub desc: String,
}
