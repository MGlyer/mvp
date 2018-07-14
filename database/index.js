const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/books')
mongoose.connect('mongodb://user:guestguest1@ds137601.mlab.com:37601/mvpdatabase')

let db = mongoose.connection;

let bookSchema = mongoose.Schema({
    // bookID: Number,
    // title: String,
    title: {type: String, unique: true},
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
    // FaveBook.findOneAndUpdate({
    //     title: newFave.title,
    // }, {
    //     title: newFave.title,
    //     img: newFave.img
    // }, {upsert:true}, (err) => {
    //     if (err) console.error(err)
    // }).exec()
    let book = new FaveBook({
        title: newFave.title,
        img: newFave.img
    })
    book.save()
        .catch((err) => console.error(err))
}

let fetch = (cb) => {
    FaveBook.find({}, (err, docs) => {
        if (err) console.error(err)
        else cb(null, docs)
    })
}

let remove = (toRemove) => {
    FaveBook.find({title: toRemove.title}).remove().exec()
}




module.exports.save = save
module.exports.fetch = fetch
module.exports.remove = remove