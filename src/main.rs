use actix_cors::Cors;
use actix_files::NamedFile;
use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer, Result};
use qrcode::render::svg;
use qrcode::QrCode;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

/// The program input string to be deserialized from JSON
#[derive(Deserialize)]
struct Input {
    text: String,
}

/// The SVG output to be serialized as JSON
#[derive(Serialize)]
struct Output {
    svg: String,
}

/// Extract `Input` and run QR encoding logic, generates an SVG xml string
async fn gen_qrcode(input: web::Json<Input>) -> Result<HttpResponse> {
    println!("- {:?}", input.text);

    // Encode user input into bits.
    let code = QrCode::new(input.text.clone()).unwrap();

    // Render the an SVG
    let out = code.render::<svg::Color>().min_dimensions(200, 200).build();

    Ok(HttpResponse::Ok().json(Output {
        svg: out.to_string(),
    }))
}

/// Allow access of the index file
async fn index(_: HttpRequest) -> Result<NamedFile> {
    Ok(NamedFile::open(PathBuf::from("./example/index.html"))?)
}

/// The main loop executing the server
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Recieved input text:");
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::new().supports_credentials().finish())
            .route("/", web::get().to(index))
            .route("/to_qrcode", web::post().to(gen_qrcode))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
