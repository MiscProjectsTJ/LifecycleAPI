// import '@tensorflow/tjsf-backend-cpu';
// import '@tensorflow/tjfs-backend-webgl';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import imageURL from 'test_input_images\glass.jpg';
// import image2URL from 'test_input_images\cardboard_recycling.jpg';
const cocoSsd = require('@tensorflow-models/coco-ssd');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
// const cocoSsd = require('@tensorflow-models/coco-ssd');
// let modelPromise;
// modelPromise = cocoSsd.load();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")
// const fs = require("fs");
const app = express();
app.get('/', (req, res) =>{
   res.send('Welcome to the api')
})

app.use(bodyParser.urlencoded());

app.use(bodyParser.json({limit: "1000mb"}));
app.post("/add", (req, res) => {
    console.log("Succesul recieve")
    // console.log(req);
    const base64 = req.body.val;
    const buffer = Buffer.from(base64, "base64");
    const t = tf.node.decodeImage(buffer);
    var key = "test_input_images/"+base64.substring(2, 9)+".jpg";
    fs.writeFile(key, buffer);

    Promise.all([cocoSsd.load(), fs.readFile(key)]) //600,600,3
    .then((results) => {
        // First result is the COCO-SSD model object.
        const model = results[0];
        // Second result is image buffer.
        var imgTensor = tf.node.decodeImage(new Uint8Array(results[1]), 3);
        // imgTensor = tf.image.resizeBilinear(imgTensor, size = [600,600])
        console.log("Tensor shape: ");
        console.log(imgTensor.shape);
        // imgTensor.print()
        // Call detect() to run inference.
        return model.detect(imgTensor);
    })
    .then((predictions) => {
        console.log("got predictions");
        console.log(predictions);
        console.log(JSON.stringify(predictions, null, 2));
    });
    const result = "plastic bottle";
    res.send({
        result: result
    });
});


let PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Up And Running At Port ${PORT}`);
});
