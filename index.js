const express = require('express');
const app = express();

app.get('/', (req, res) =>{
   res.send('Home Page')
})

app.get('/api', (req, res) =>{
    res.send('API Page')
})

app.get('/users', (req, res) =>{
    res.send('Users Page')
})


let PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Up And Running At Port ${PORT}`);
});
