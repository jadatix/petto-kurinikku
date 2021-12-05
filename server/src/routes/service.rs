use mongodb::bson::doc;
use rocket_contrib::json::{Json, JsonValue};
use serde::Deserialize;

use crate::config::DB;
use crate::db::service::{new_service_to_doc, ServiceRepository};
use crate::db::MongoRepository;
use std::error::Error;

#[get("/services")]
pub fn get_services(db: DB) -> Result<JsonValue, Box<dyn Error>> {
  let result = ServiceRepository::find_all(&db)?;
  Ok(json!({ "doctors": result }))
}

#[get("/services/<id>")]
pub fn get_service(id: String, db: DB) -> Option<JsonValue> {
  let result = ServiceRepository::find_by_id(id.as_str(), &db)?;
  Some(json!(result))
}

#[derive(Deserialize)]
pub struct NewService {
  pub name: String,
  pub desc: String,
  pub price: i32,
}

#[post("/services", format = "json", data = "<new_service>")]
pub fn create_service(new_service: Json<NewService>, db: DB) -> Result<JsonValue, Box<dyn Error>> {
  let result = ServiceRepository::save(
    new_service_to_doc(NewService {
      name: new_service.name.to_string(),
      desc: new_service.desc.to_string(),
      price: new_service.price,
    }),
    &db,
  )?;
  Ok(json!(result))
}

#[delete("/services/<id>")]
pub fn delete_service(id: String, db: DB) -> Result<JsonValue, Box<dyn Error>> {
  ServiceRepository::delete(id.as_str(), &db)?;
  Ok(json!({ "id": id }))
}
