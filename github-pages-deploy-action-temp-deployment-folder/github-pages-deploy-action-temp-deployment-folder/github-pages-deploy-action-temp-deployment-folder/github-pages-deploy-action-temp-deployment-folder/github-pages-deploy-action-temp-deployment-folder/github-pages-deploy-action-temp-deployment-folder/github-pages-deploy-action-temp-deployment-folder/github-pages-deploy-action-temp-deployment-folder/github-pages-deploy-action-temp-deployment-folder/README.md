<p align="center"><img src="docs/qrs.svg" width="350px"/></p>

<div align="center">

![GitHub Workflow - rust-wasm](https://github.com/de-sh/qrs/workflows/rust-wasm/badge.svg)

</div>

# QRust
Generate QR codes with rust

Started off as a server-side app and now is a client side web-app using WASM!

[inspired from this article](https://www.kiranjohns.xyz/blog/firebase-qr/) by Kiran Johns and built with [kennytm/qrcode-rs](https://github.com/kennytm/qrcode-rust).

### Compile WASM
1. Setup the environment for WASM compilation
```rust
rustup target add wasm32-unknown-unknown
rustup override set nightly
cargo install wasm-pack wasm-gc
```
2. Generate the WASM and bindings
```rust
wasm-pack build --target web
wasm-gc pkg/qrs_bg.wasm
```

### View the Creation
1. Setup a web-server to host the following files & folders in particular:
    - index.html - The html that loads the app.
    - index.js - The JS that starts the show.
    - pkg/ - The package folder that houses our wasm and bindings generated with [`wasm-pack`](https://github.com/rustwasm/wasm-pack).
2. Open `http://localhost:8080` in a browser.