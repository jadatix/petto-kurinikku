use crate::db::{MongoEntity, MongoRepository};
use crate::models::customer::Customer;
use crate::routes::customer::NewCustomer;
use mongodb::bson::{doc, document::Document};

pub struct CustomerRepository {}

impl MongoEntity for Customer {
  fn collection() -> String {
    String::from("customers")
  }
}

pub fn new_customer_to_doc(new_customer: NewCustomer) -> Document {
  doc! {
    "name": new_customer.name,
    "phone": new_customer.phone,
    "email": new_customer.email,
    "message": new_customer.message,
    "ordered_service": new_customer.ordered_service,
    "examined_doctor": new_customer.examined_doctor
  }
}

impl MongoRepository for CustomerRepository {
  type Entity = Customer;
}
