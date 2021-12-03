use mongodb::bson::doc;
use rocket_contrib::json::{Json, JsonValue};
use serde::Deserialize;

use crate::config::DB;
use crate::db::customer::{new_customer_to_doc, CustomerRepository};
use crate::db::MongoRepository;
use std::error::Error;

#[get("/customers")]
pub fn get_customers(db: DB) -> Result<JsonValue, Box<dyn Error>> {
  let result = CustomerRepository::find_all(&db)?;
  Ok(json!({ "customers": result }))
}

#[get("/customers/<id>")]
pub fn get_customer(id: String, db: DB) -> Option<JsonValue> {
  let result = CustomerRepository::find_by_id(id.as_str(), &db)?;
  Some(json!(result))
}

#[derive(Deserialize)]
pub struct NewCustomer {
  pub name: String,
  pub phone: String,
  pub email: String,
  pub message: String,
  pub ordered_service: String,
  pub examined_doctor: String,
}

#[post("/customers", format = "json", data = "<new_customer>")]
pub fn create_customer(
  new_customer: Json<NewCustomer>,
  db: DB,
) -> Result<JsonValue, Box<dyn Error>> {
  let result = CustomerRepository::save(
    new_customer_to_doc(NewCustomer {
      name: new_customer.name.to_string(),
      phone: new_customer.phone.to_string(),
      email: new_customer.email.to_string(),
      message: new_customer.email.to_string(),
      ordered_service: new_customer.ordered_service.to_string(),
      examined_doctor: new_customer.examined_doctor.to_string(),
    }),
    &db,
  )?;
  Ok(json!(result))
}

#[put("/customers/<id>?<ordered_service>&<examined_doctor>")]
pub fn update_customer(
  id: String,
  ordered_service: String,
  examined_doctor: String,
  db: DB,
) -> Result<JsonValue, Box<dyn Error>> {
  CustomerRepository::update(
    id.as_str(),
    doc! {
      "$set": {
        "ordered_service": ordered_service.to_string(),
        "examined_doctor": examined_doctor.to_string()
      }
    },
    &db,
  )?;
  Ok(json!({ "id": id }))
}

#[delete("/customers/<id>")]
pub fn delete_customer(id: String, db: DB) -> Result<JsonValue, Box<dyn Error>> {
  CustomerRepository::delete(id.as_str(), &db)?;
  Ok(json!({ "id": id }))
}
