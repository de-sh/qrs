// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import init, {
    gen_qrcode,
} from "./pkg/qrs.js";

if (!('WebAssembly' in window)) {
    alert('you need a browser with wasm support enabled :(');
} else {

    
    
    document.querySelector("#wrapper").innerHTML = '<h2>QR Coder</h2><p>Paste the link or text you want to convert to a QR Code below</p><div class="form-group"><label for="inputArea">Paste your text here</label><input type="text" class="form-control" id="input" placeholder="Paste the link/text here." name="input" required></div><button id="exec" class="btn btn-primary">Generate</button>';
    var input = document.querySelector("#input");
    document.querySelector("#exec").onclick = async () => {
        // Instantiate our wasm module
        const qrs = await init("./pkg/qrs_bg.wasm");
        var out = '<h2>QR Coder</h2><p>The QR code has been generated!</p>' + gen_qrcode(input.value) + '</br><button href="#" class="btn btn-primary">Go Back</button>';
        document.querySelector("#wrapper").innerHTML = out;
    };
}
