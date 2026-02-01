const express = require('express');
const app = express();
const noteModel = require('./models/note.model')

app.use(express.json())

// Creating API -- POST
app.post('/api/notes', async (req, res) =>{
    const {title, description} = req.body;

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

// Fetching Data from mongoDB -- GET
//find method will always return data in array of object format
app.get('/api/notes', async (req, res) =>{
    const notes = await noteModel.find()         

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

// Deleting the api -- DELETE
app.delete('/api/notes/:id', async (req, res) =>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note deleted successfully"
    })
})

// Update the api -- PATCH
app.patch('/api/notes/:id', async (req, res) =>{
    const id = req.params.id;
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(id, {
        description
    })
    res.status(200).json({
        message:"Note updated successfully"
    })
})

module.exports = app