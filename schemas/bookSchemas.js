const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const bookSchema = new Schema ( {
    bookName : String,
    authorName:String,
    price : Number,
    category:String,

})

module.exports = mongoose.model('books',bookSchema)