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
    // let dummy = new FaveBook({
    //     title: 'dummy',
    //     img: ''
    // })
    // dummy.save()
    console.log('the Database is OPEN!')
})

let save = (newFave) => {
    let book = new FaveBook({
        title: newFave.title,
        img: newFave.img
    })
    book.save()
        .catch((err) => console.error(err))
}

let fetch = () => {
    FaveBook.find({})
}




module.exports.save = save
module.exports.fetch = fetch