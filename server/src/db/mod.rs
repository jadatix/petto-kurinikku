use mongodb::bson::{doc, document::Document, oid::ObjectId};
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};

use crate::config::DB;
use crate::errors::Error;

use crate::errors::Error::{InvalidIDError, MongoQueryError};

pub mod customer;
pub mod doctor;
pub mod service;

static DB_NAME: &'static str = "vetclinic";

pub trait MongoEntity {
  fn collection() -> String;
}

pub trait MongoRepository {
  type Entity: MongoEntity;

  fn find_by_id(id: &str, db: &DB) -> Option<Document> {
    let oid = ObjectId::with_string(id).expect("Failed to create ObjectId");

    let query = doc! {
      "_id": oid,
    };

    match db
      .client
      .database(DB_NAME)
      .collection_with_type::<Document>(Self::Entity::collection().as_str())
      .find_one(query, None)
    {
      Ok(document) => document,
      Err(_) => None,
    }
  }

  fn find_all(db: &DB) -> Result<Vec<Document>, Error> {
    let mut cursor = db
      .client
      .database(DB_NAME)
      .collection_with_type::<Document>(Self::Entity::collection().as_str())
      .find(None, None)
      .map_err(MongoQueryError)?;
    let mut result: Vec<Document> = Vec::new();
    while let Some(doc) = cursor.next() {
      result.push(doc?);
    }
    Ok(result)
  }

  fn update(id: &str, document: Document, db: &DB) -> Result<UpdateResult, Error> {
    let oid = ObjectId::with_string(id).map_err(|_| InvalidIDError(id.to_owned()))?;
    let query = doc! {
      "_id": oid,
    };

    let result = db
      .client
      .database(DB_NAME)
      .collection(Self::Entity::collection().as_str())
      .update_one(query, document, None)?;
    Ok(result)
  }

  fn save(document: Document, db: &DB) -> Result<InsertOneResult, Error> {
    let result = db
      .client
      .database(DB_NAME)
      .collection(Self::Entity::collection().as_str())
      .insert_one(document, None)
      .map_err(MongoQueryError)?;
    Ok(result)
  }

  fn delete(id: &str, db: &DB) -> Result<DeleteResult, Error> {
    let oid = ObjectId::with_string(id).map_err(|_| InvalidIDError(id.to_owned()))?;
    let query = doc! {
      "_id": oid,
    };

    let result = db
      .client
      .database(DB_NAME)
      .collection(Self::Entity::collection().as_str())
      .delete_one(query, None)
      .map_err(MongoQueryError)?;
    Ok(result)
  }
}
