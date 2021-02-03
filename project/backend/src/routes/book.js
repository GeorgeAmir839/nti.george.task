const express = require('express')
const Book = require('../models/book')
const userAuth = require('../middleware/authUser')
const adminAuth = require('../middleware/authAdmin')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()

router.post('/book/add', generalAuth, async(req,res)=>{
    try{
       // res.send(req.user)
        // userBooks =await Book.find({author:req.user._id})
        // console.log(userBooks.length)
        // if(userBooks.length%2==0) console.log('new')
        // else console.log('e3ada')
        const book = new Book({
            ...req.body,
            author: req.user._id
        })
      //  console.log(book)
        if(req.user.userType == true) book.status=true
        else book.status = false
        await book.save()
        res.send(book)
    }
    catch(e){
        res.send(e)
    }
})

router.post("/book/confirm/:bookId", adminAuth, async(req,res)=>{
    try{
        book = await Book.findOne({_id: req.params.bookId})
        if(!book) return res.send('not found')
        book.status= true
        book.save()
        res.send('confirmed')
    }
    catch(error) {res.send(error)}
})

router.get('/books/:catId', generalAuth, async(req,res)=>{
    try{
       // console.log(req.params.catId)
        books= await Book.find({'category.catId':req.params.catId})
        res.send(books)
    }
    catch(e){
        res.send(e)
    }
})

module.exports= router