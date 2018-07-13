const express = require('express')
let server = express()

//middleware
const parser = require('body-parser')
const axios = require('axios')

//hookup functionality
server.use(parser.json())
server.use(express.static(__dirname + '/../client/dist'));










//server activation
let port = process.env.PORT || 8080
server.listen(port, () => console.log(`listening in on port ${port}`))