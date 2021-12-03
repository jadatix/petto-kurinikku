use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Customer {
  pub id: String,
  pub name: String,
  pub phone: String,
  pub email: String,
  pub message: String,
  pub ordered_service: String,
  pub examined_doctor: String,
}
