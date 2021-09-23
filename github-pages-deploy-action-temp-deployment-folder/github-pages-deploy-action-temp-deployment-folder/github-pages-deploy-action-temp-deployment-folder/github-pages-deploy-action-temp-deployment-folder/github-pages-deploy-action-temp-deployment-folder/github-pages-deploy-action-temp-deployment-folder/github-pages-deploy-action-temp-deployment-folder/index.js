// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import init, {
    gen_qrcode,
} from "./pkg/qrs.js";

if (!('WebAssembly' in window)) {
    alert('you need a browser with wasm support enabled :(');
} else {
    // Refreshes the application UI
    const app_fresh = () => {
        document.querySelector("#desc").innerHTML = 'Paste the link or text you want to convert to a QR Code below';
        document.querySelector(".form-group").innerHTML = '<label for="inputArea">Paste your text here</label> <input type="text" class="form-control" id="input" placeholder="Paste the link/text here." name="input" required>';
        document.querySelector("#form-control").innerHTML = '<button id="exec" class="btn btn-primary">Generate</button>';
        // Add the ability to generate QR code SVG in the app UI
        document.querySelector("#exec").onclick = () => {
            // Generate the SVG file for input
            var input = document.querySelector("#input").value;
            var data = gen_qrcode(input);

            // Display the generated SVG
            document.querySelector("#desc").innerHTML = "The QR code has been generated!";
            document.querySelector(".form-group").innerHTML = data;
            document.querySelector("#form-control").innerHTML = '<button id="return" class="btn btn-primary">Go Back</button> <button id="get" class="btn btn-secondary">Download</button>';

            // Restore to original state of app on return
            document.querySelector("#return").onclick = () => { app_fresh() };

            // Enable downloading of SVG
            document.querySelector("#get").onclick = () => {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
                element.setAttribute('download', 'output.svg');

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            };
        };
    };

    (async () => {
        // Instantiate our wasm module
        const qrs = await init("./pkg/qrs_bg.wasm");

        // Display a normal app, ready to be operated on
        app_fresh();
    })();
}
