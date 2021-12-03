use mongodb::options::ClientOptions;
use mongodb::sync::Client;
use rocket::request::{self, FromRequest};
use rocket::{Outcome, Request, State};
use std::ops::Deref;

#[derive(Clone, Debug)]
pub struct DB {
  pub client: Client,
}

pub fn init() -> Client {
  let mongo_uri =
    "mongodb+srv://admin:admin@cluster0.eqn0h.mongodb.net/vetclinic?retryWrites=true&w=majority";
  let mut client_options =
    ClientOptions::parse(mongo_uri).expect("Can't parse client options");
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
