// External requirments
const express = require('express')

// Format express
const PORT = process.env.PORT || 3001
const app = express()

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Serve ignition
app.listen(PORT, () => {
    console.log(`You are currently tuned into port ${PORT}`)
})