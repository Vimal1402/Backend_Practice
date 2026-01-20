const express = require('express');

const app = express(); //Create server instance

app.get('/', (req, res) => {
    res.send("Hello world");
})
app.get('/about', (req, res) =>{
    res.send("I'm about Page")
})
app.get('/home', (req, res) =>{
    res.send("I'm Home Page")
})

app.listen(3000); //Server Start krna

