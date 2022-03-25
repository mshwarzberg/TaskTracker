const express = require('express')
const app = express()
const mongoose = require('mongoose')
const taskRouter = require('./routes/task')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const dbURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

mongoose.connect(dbURI)
    .then(() => app.listen(5000))
    .catch((err) => console.log(err))

app.use('/task', taskRouter)