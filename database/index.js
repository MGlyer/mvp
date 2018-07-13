const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/books')

let db = mongoose.connection;

let bookSchema = mongoose.Schema({
    // bookID: Number,
    title: String,
    // author: String,
    // price: Number,
    img: String
})

let FaveBook = mongoose.model('FaveBook', bookSchema)

db.once('open', () => {
    console.log(`database is open!`)
})

let save = (newFave) => {
    return new FaveBook({
        title: newFave.title,
        img: newFave.img
    }).save()
}




module.exports.save = save