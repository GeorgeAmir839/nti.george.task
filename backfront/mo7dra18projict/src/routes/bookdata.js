const express = require('express')
const Book = require('../models/book')
const adminAuth = require('../middleware/authAdmin')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()
router.post('/add/book', async (req, res) => {
    try {
        const book = new Book(req.body)
        await book.save()
        res.send({
            status: 1,
            data: book,
            message: "book Added"
        })
    }
    catch (error) {
        res.send({
            status: 0,
            data: error,
            message: "try agian"
        })
    }
})
router.get('/showall/book', generalAuth, async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).send({
            status: 1,
            data: { books },
            message: "book retrived succussfuly"
        })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            data: { error },
            message: "book retrived error"
        })
    }
})
router.post('/admin/confirmType/:bookId', adminAuth, async(req,res)=>{
    try{
        const bookId = req.params.bookId
        const book = await Book.findOne({_id:bookId})
        if(!book) throw new Error('user not found')
        book.status = true
        await book.save()
        res.send('CONFIRM')
        }
        catch(error){
            res.send(error)
        }
})
module.exports = router