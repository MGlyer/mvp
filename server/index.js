const express = require('express')
let server = express()

//middleware and helper functions
const parser = require('body-parser')
const axios = require('axios')
const APIKEY = require('../config.js')


//hookup functionality
server.use(parser.json())
server.use(express.static(__dirname + '/../client/dist'));


//server functions
server.post('/', (req, res) => {
    let genre = req.body.genre
    let era = req.body.era
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&KEY=${APIKEY}`)
         .then((response) => {
            //  console.log('data received from google! ', response.data)
             res.send(response.data.items)
         })
         .catch((err) => console.error(err))
})

server.get('/faves', (req, res) => {
    res.send('sucessful get request!')
})






//server activation
let port = process.env.PORT || 8080
server.listen(port, () => console.log(`listening in on port ${port}`))