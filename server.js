// Dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')


// Format express
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Test route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Serve ignition
app.listen(PORT, () => {
    console.log(`You are currently tuned into port ${PORT}`)
})