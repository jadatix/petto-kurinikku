use crate::db::{MongoEntity, MongoRepository};
use crate::models::service::Service;
use crate::routes::service::NewService;

use mongodb::bson::{doc, document::Document};

pub struct ServiceRepository {}

impl MongoEntity for Service {
  fn collection() -> String {
    String::from("services")
  }
}

pub fn new_service_to_doc(new_service: NewService) -> Document {
  doc! {
    "name": new_service.name,
    "desc": new_service.desc,
    "price": new_service.price
  }
}

impl MongoRepository for ServiceRepository {
  type Entity = Service;
}