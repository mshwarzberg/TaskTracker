const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required:true
    },
    typeof: {
        type: String,
        required:true
    },
    reminder: {
        type: Boolean
    }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task