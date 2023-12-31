const express = require ('express')
const { allBooks, Book, createBook, updateBook, deleteBook } = require('../contoller/bookController')
const router = express.Router()
const authMiddleware = require ('../midleware/auth')


router.get ('/api/books',authMiddleware, allBooks)
router.get ('/api/books/:id',authMiddleware, Book)
router.post ('/api/books',authMiddleware, createBook)
router.put ('/api/books/:id', authMiddleware,updateBook)
router.delete ('/api/books/:id', deleteBook)
















module.exports = router