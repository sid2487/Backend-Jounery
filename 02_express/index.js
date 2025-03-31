import 'dotenv/config'
// const express = require('express') // this will not work here instead use below one
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const app = express()

const port = process.env.PORT || 3000

/*
we just send the data
// using the request, i can extract all of the data coming from the user and by using response, i can respond to them.
app.get("/", (req, res) => {
    res.send("Hello from sid!!")
})

app.get("/ice-tea", (req, res) => {
    res.send("What ice tea would you prefer?")
})

app.get("/twitter", (req, res) => {
    res.send("mishrasid007")
})
*/

// now we will accept some data from front end
app.use(express.json()) // any data which comes in json form, we will accept that

// Winston is used for structured and persistent logging (errors, events, etc.).
// Morgan is used for logging HTTP requests (method, URL, status, response time).

const morganFormat = ":method :url :status :response-time ms";


app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

let teaData = []
let nextId = 1

// add a new tea
app.post('/teas', (req, res) => {
    logger.info("A post request is made to a new tea.")
    const { name, price } = req.body // Extract data sent by client
    const newTea = { id: nextId++, name, price } // Creates a new object with a unique id
    teaData.push(newTea) // Store it in the database (or an array in this case)
    res.status(201).send(newTea) // Send the newly created object back
})

// get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// to get single tea(get a tea with id)
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

// update
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

// delete
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(200).send('deleted')
})

app.listen(port, () => {
    console.log(`Server is runnig at port: ${port}....`);

})

// nodemon dependency is used so that we don't need to restart our server evertime we do some changes.(npm i -D nodemon -->> this is how we install something which doesn't need to send to production or servers, just for the development dependencies)

// npm i express -->> this is how we install our regular dependencies

// params: if you are sending anything inside the url, you extract that through params keyword.

// const {name, price} = req.body -->> req.body is an object that contains the data sent by the client in the request body (e.g., in a POST or PUT request).
// { name, price } is destructuring – it extracts name and price properties from req.body into separate variables
// without destructuring:  
// const name = req.body.name;
// const price = req.body.price;