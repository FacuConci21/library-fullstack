const router = require('express').Router();
const Book = require('../models/Book');
const fs = require('fs-extra');
const path = require('path');


router.route('/')
    .get( async (req,res) => {
        const allBooks = await Book.find();
        res.status(200).json(allBooks);
    })
    .post( async (req, res) => {
        const { title, author, isbn } = req.body;
        const  imgPath = '/uploads/'+req.file.filename;
        let newBook = new Book({
            title, author, isbn, imgPath
        })
        await newBook.save();
        newBook = await Book.findOne(newBook, '_id');
        res.status(200).json(newBook);
    });

router.route('/:id')
    .get( async (req, res) => {
        const aBook = await Book.findById(req.params.id);
        res.status(200).json(aBook);
    })
    .delete( async (req, res) => {
        const bookDeleted = await Book.findByIdAndDelete({ _id: req.params.id });
        fs.unlink(path.resolve('./backend/public' + bookDeleted.imgPath));
        res.status(200).json({ message: `Document with _id:${req.params.id} deleted.`})
    })
    .put( async (req, res) => {
        await Book.updateOne({ _id: req.params.id },{ ...req.body });
        const modifBook = await Book.findById(req.params.id);
        res.status(200).json(modifBook);
    })

module.exports = router;

