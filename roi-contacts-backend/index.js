;(async () => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const { MongoClient, ObjectId } = require('mongodb')

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())

    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    const db = client.db('contactsDb')
    const people = db.collection('people')

    //read all
    app.get('/contacts', async (request, response) => {
        let result = await people.find().toArray()
        response.json(result)
    })
    //read on (by id)
    app.get('/contacts/:id', async (request, response) => {
        let result = await people.findOne({ _id: new ObjectId(request.params.id) })
        response.json(result)
    })
    //create
    app.post('/contacts', async (request, response) => {
        let person = request.body
        let result = await people.insertOne(person)
        response.status(201).json(person)
    })
    //delete
    app.delete('/contacts/:id', async (request, response) => {
        let result = await people.deleteOne({
            _id: new ObjectId(request.params.id)
        })
        response.sendStatus(200)
    })
    //update entire object
    app.put('/contacts/:id', async (request, response) => {
        let person = request.body
        let filter = { _id: new ObjectId(request.params.id) }
        let result = await people.updateOne(filter, { $set: person })
        person._id = request.params.id
        response.status(200).json(person)
    })

    //patch is a partial (more surgical) update
    app.patch('/contacts/:id', async (request, response) => {
        let patch = request.body
        let filter = { _id: new ObjectId(request.params.id) }
        let result = await people.updateOne(filter, { $set: patch })
        response.status(200)
    })

    app.listen(3000, () => {
        console.log('The server has started')
    })
})()
