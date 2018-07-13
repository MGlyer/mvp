const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/books')

let db = mongoose.connection;
db.on('open', () => {
    console.log(`database is open!`)
})

let bookSchema = mongoose.Schema({
    bookID: Number,
    title: String,
    author: String,
    price: Number,
    img: String
})

let FaveBook = mongoose.model('FaveBook', bookSchema)