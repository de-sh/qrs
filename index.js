if (!('WebAssembly' in window)) {
    alert('you need a browser with wasm support enabled :(');
}

// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import wasmInit, { gen_qrcode } from "./pkg/qrs.js";
var exec = (async (input) => {
    // Instantiate our wasm module
    const qrs = await wasmInit("./pkg/qrs_bg.wasm");

    console.log(gen_qrcode(input));

})();

export default exec;