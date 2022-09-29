// Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')
const uniqid = require('uniqid')

// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// API GET route to display previously saved notes
app.get('/api/notes', (req, res) => {

    // Save data from db.json to a variable
    let savedNotes = fs.readFileSync('./db/db.json', 'utf8')

    // Return a response a of parsed json data from db.json
    res.json(JSON.parse(savedNotes))
})

// API POST route to add new notes
app.post('/api/notes', (req, res) => {
    
    // Store new note as an object
    const newNote = {
        ...req.body,
        id: uniqid()
    }

    // Save data from db.json as a variable
    let savedNotes = fs.readFileSync('./db/db.json', 'utf8')

    // Parse data from db.json and save it as a variable
    let notesData = JSON.parse(savedNotes)

    // Add newNote to db.json array
    notesData.push(newNote)

    // Write the data from newNote to db.json
    fs.writeFile('./db/db.json', JSON.stringify(notesData), (err, text) => {
        if (err) {
            console.log(err)
            return
        }
    })

    // Return a response of parsed json data from db.json
    res.json(savedNotes)
})

// API DELETE route to delete notes
app.delete('/api/notes/:id', (req, res) => {
    // Save data from db.json to a variable
    let savedNotes = fs.readFileSync('./db/db.json', 'utf8')

    // Parse data from db.json and save it as a variable
    let notesData = JSON.parse(savedNotes)

    // Filter the array of notes
    const notes = notesData.filter((note) => {
        return note.id !== req.params.id
    })

    // Write the new array to db.json
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, text) => {
        if (err) {
            console.error(err)
            return
        }
    })

    // Return a response of parsed json data from db.json
    res.json(notes)
})    

// Route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Server ignition
app.listen(PORT, () => {
    console.log(`You are currently tuned into port ${PORT}`)
})