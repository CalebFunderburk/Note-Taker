// Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')

// Database
const { notes } = require('./db/db.json')

// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Route to display previously saved notes
app.get('/api/notes', (req, res) => {
    let savedNotes = fs.readFileSync('./db/db.json', 'utf8')
    res.json(JSON.parse(savedNotes))
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