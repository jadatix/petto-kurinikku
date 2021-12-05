#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

mod config;
mod db;
mod errors;
mod models;
mod routes;

pub fn rocket() -> rocket::Rocket {
  rocket::ignite()
    .mount(
      "/api",
      routes![
        routes::customer::get_customers,
        routes::customer::get_customer,
        routes::customer::create_customer,
        routes::customer::update_customer,
        routes::customer::delete_customer,
        routes::doctor::get_doctors,
        routes::doctor::get_doctor,
        routes::doctor::create_doctor,
        routes::doctor::delete_doctor,
        routes::service::create_service,
        routes::service::delete_service,
        routes::service::get_service,
        routes::service::get_services,
        routes::customer::find_by_date,
      ],
    )
    .manage(config::init())
}
