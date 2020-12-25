const {Schema, model} = require('mongoose');


const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn:  { type: String, required: true },
    imgPath: { type: String, required: true },
    date:  { type: Date, default: Date.now },
},{
    timestamps: true
})


module.exports = model('Book',BookSchema);
