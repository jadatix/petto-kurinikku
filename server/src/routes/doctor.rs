use mongodb::bson::doc;
use rocket_contrib::json::{Json, JsonValue};
use serde::Deserialize;

use crate::config::DB;
use crate::db::doctor::{new_doctor_to_doc, DoctorRepository};
use crate::db::MongoRepository;
use std::error::Error;

#[get("/doctors")]
pub fn get_doctors(db: DB) -> Result<JsonValue, Box<dyn Error>> {
  let result = DoctorRepository::find_all(&db)?;
  Ok(json!({ "doctors": result }))
}

#[get("/doctors/<id>")]
pub fn get_doctor(id: String, db: DB) -> Option<JsonValue> {
  let result = DoctorRepository::find_by_id(id.as_str(), &db)?;
  Some(json!(result))
}

#[derive(Deserialize)]
pub struct NewDoctor {
  pub img: String,
  pub spec: String,
  pub name: String,
  pub desc: String,
}

#[post("/doctors", format = "json", data = "<new_doctor>")]
pub fn create_doctor(new_doctor: Json<NewDoctor>, db: DB) -> Result<JsonValue, Box<dyn Error>> {
  let result = DoctorRepository::save(
    new_doctor_to_doc(NewDoctor {
      img: new_doctor.img.to_string(),
      spec: new_doctor.spec.to_string(),
      name: new_doctor.name.to_string(),
      desc: new_doctor.desc.to_string(),
    }),
    &db,
  )?;
  Ok(json!(result))
}

#[delete("/doctors/<id>")]
pub fn delete_doctor(id: String, db: DB) -> Result<JsonValue, Box<dyn Error>> {
  DoctorRepository::delete(id.as_str(), &db)?;
  Ok(json!({ "id": id }))
}
