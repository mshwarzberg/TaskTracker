const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.delete('/delete', (req, res) => {
    return Task.deleteOne(req.body)
                .then((result) => {
                    console.log(result);
                })
                .catch(err => console.log(err))
})

router.get('/view', (req, res) => {
    Task.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/new', (req, res) => {
    
    const data = req.body

    const task = new Task({
        header: data.header,
        details: data.details,
        dateadded: data.dateadded,
        deadline: data.deadline,
        typeof: data.typeof,
        reminder: data.reminder
    })

    task.save()
        .then((result) => {
            res.send(result)
        })
        .catch(err => {
            res.send('You screwed up', err)
        })
})

router.patch('/edit', (req, res) =>  {
    
    Task.findOneAndUpdate({ _id: req.body._id}, {
        header: req.body.header,
        details: req.body.details,
        deadline: req.body.deadline,
        typeof: req.body.typeof,
        reminder: req.body.reminder,
    }).exec()
})

router.delete('/', (req, res) => {
    return Task.deleteOne(req.body)
                .then((result) => {
                    console.log(result);
                })
                .catch(err => console.log(err))
})

module.exports = router