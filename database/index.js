const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/books')

let db = mongoose.connection;
db.on('open', () => {
    console.log(`database is open!`)
})