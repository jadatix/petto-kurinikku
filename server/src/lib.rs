#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

use dotenv::dotenv;

mod config;
mod db;
mod errors;
mod models;
mod routes;

pub fn rocket() -> rocket::Rocket {
  dotenv().ok();
  rocket::ignite()
    .mount(
      "/api",
      routes![
        routes::customer::get_customers,
        routes::customer::get_customer,
        routes::customer::create_customer,
        routes::customer::update_customer,
      ],
    )
    .manage(config::init())
}
