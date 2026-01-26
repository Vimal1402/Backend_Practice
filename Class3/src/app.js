const express = require("express");

const app = express();

const notes = [];

app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.post("/notes", (req, res) =>{
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    res.status(201).json({
        message:"Notes created successfully"
    })
})

app.get("/notes", (req, res) =>{
    res.status(200).json({
        notes:notes
    });
})

app.patch("/notes/:index", (req, res) =>{
    notes[req.params.index].description = req.body.description;
    res.status(201).json({
        message:"Notes Updated successfully"
    });
})

app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]
    res.status(200).json({
        message:"Notes Deleted successfully"
    })
})

module.exports = app;