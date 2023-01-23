require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

const app = express()

// Config JSON response
app.use(express.json())


// Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a API!"})
})

// Others Routes
app.use('/auth', authRoute)
app.use('/user', userRoute)

// Credentials for MongoDB
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.xwjpeut.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(402, () => {
            console.log("Server started!")
        })
        console.log("Mongo connected successfully!")})
    .catch((err) => {
        console.log(err)
    })

