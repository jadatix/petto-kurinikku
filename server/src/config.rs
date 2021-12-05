use chrono::{offset::TimeZone, DateTime, Utc, NaiveDateTime};
use mongodb::{options::ClientOptions, sync::Client};
use rocket::http::RawStr;
use rocket::request::{self, FromFormValue, FromRequest};
use rocket::{Outcome, Request, State};
use std::{ops::Deref, convert::Into};

#[derive(Clone, Debug)]
pub struct DB {
  pub client: Client,
}

pub fn init() -> Client {
  let mongo_uri =
    "mongodb+srv://admin:admin@cluster0.eqn0h.mongodb.net/vetclinic?retryWrites=true&w=majority";
  let mut client_options = ClientOptions::parse(mongo_uri).expect("Can't parse client options");
  let db_name = String::from("vetclinic");
  client_options.app_name = Some(db_name);

  Client::with_options(client_options).expect("Failed to create Client")
}

/*
    Create a implementation of FromRequest so DB can be provided at every api endpoint
*/
impl<'a, 'r> FromRequest<'a, 'r> for DB {
  type Error = ();

  fn from_request(request: &'a Request<'r>) -> request::Outcome<DB, ()> {
    let client = request.guard::<State<Client>>()?;
    Outcome::Success(DB {
      client: client.clone(),
    })
  }
}

/*
    When DB is dereferenced, return the mongo client
*/
impl Deref for DB {
  type Target = Client;

  fn deref(&self) -> &Self::Target {
    &self.client
  }
}

pub struct NaiveDateTimeFrom(NaiveDateTime);

impl<'v> FromFormValue<'v> for NaiveDateTimeFrom {
  type Error = &'v RawStr;

  fn from_form_value(form_value: &'v RawStr) -> Result<NaiveDateTimeFrom, &'v RawStr> {
    let decoded = form_value.url_decode().map_err(|_| form_value)?;
    if let Ok(datetime) = NaiveDateTime::parse_from_str(&decoded, "%Y-%m-%dT%H:%M:%S") {
      return Ok(NaiveDateTimeFrom(datetime))
    }
    Err(form_value)
  }
}

impl Deref for NaiveDateTimeFrom {
  type Target = NaiveDateTime;

  fn deref(&self) -> &NaiveDateTime {
    &self.0
  }
}

impl Into<DateTime<Utc>> for NaiveDateTimeFrom {
  fn into(self) -> DateTime<Utc> {
    let datetime: DateTime<Utc> = Utc.from_local_datetime(&*self).unwrap();
    datetime
  }
}
