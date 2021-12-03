use crate::db::{MongoEntity, MongoRepository};
use crate::models::doctor::Doctor;
use crate::routes::doctor::NewDoctor;

use mongodb::bson::{doc, document::Document};

pub struct DoctorRepository {}

impl MongoEntity for Doctor {
  fn collection() -> String {
    String::from("doctors")
  }
}

pub fn new_doctor_to_doc(new_doctor: NewDoctor) -> Document {
  doc! {
    "img": new_doctor.img,
    "spec": new_doctor.spec,
    "name": new_doctor.name,
    "desc": new_doctor.desc
  }
}

impl MongoRepository for DoctorRepository {
  type Entity = Doctor;
}
