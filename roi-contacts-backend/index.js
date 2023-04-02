;(async () => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const { MongoClient, ObjectId } = require('mongodb')

    // const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    // const secret = '123'

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())

    // app.use((req, res, next) => {
    //     if (req.originalUrl == '/login') {
    //         next()
    //         return
    //     }
    //     const authHeader = req.headers['authorization']
    //     const token = authHeader && authHeader.split(' ')[1]
    //     if (token == null) {
    //         return res.sendStatus(401)
    //     }

    //     jwt.verify(token, secret, (err, user) => {
    //         if (err) return res.sendStatus(403)
    //         let u = user
    //         next()
    //     })
    // })

    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect()
    const db = client.db('contactsDb')
    const people = db.collection('people')

    // app.post('/login', async (request, response) => {
    //     let user = request.body
    //     let person = await people.findOne({ firstName: user.username })
    //     let valid = await bcrypt.compare(user.password, person.password)
    //     if (!valid) {
    //         response.status(403).send()
    //         return
    //     }
    //     let token = jwt.sign(user.username, secret, {})
    //     response.json({ token })
    // })

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
        let hash = await bcrypt.hash(person.password, 10)
        person.password = hash
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
    //update entrie object
    app.put('/contacts/:id', async (request, response) => {
        let person = request.body
        delete person['_id']
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
