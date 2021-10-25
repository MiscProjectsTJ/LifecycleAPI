const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.get('/', (req, res) =>{
   res.send('Welcome to the api')
})

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.post("/add", (req, res) => {
    const {val} = req.body;
    res.send({
        result: val
    });
});


let PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Up And Running At Port ${PORT}`);
});
