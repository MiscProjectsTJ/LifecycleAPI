const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post("/add", (req, res) => {
    const {val} = req.body;
    res.send({
        result: val
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000.');
});