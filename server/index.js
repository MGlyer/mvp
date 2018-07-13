const express = require('express')
let server = express()

//middleware and helper functions
const parser = require('body-parser')
const axios = require('axios')


//hookup functionality
server.use(parser.json())
server.use(express.static(__dirname + '/../client/dist'));


//server functions







//server activation
let port = process.env.PORT || 8080
server.listen(port, () => console.log(`listening in on port ${port}`))