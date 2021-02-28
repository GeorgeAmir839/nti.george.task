const express = require('express')
const Cat = require('../models/category')
const adminAuth = require('../middleware/authAdmin')
const userAuth = require('../middleware/authUser')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()
router.post('/addcat', adminAuth, async (req, res) => {
    try {
        const cat = new Cat(req.body)
        await cat.save()
        res.send({
            status: 1,
            data: { cat },
            message: "Category Added"
        })
    }
    catch (error) {
        res.send({
            status: 0,
            data: { error },
            message: "try agian"
        })
    }
})
router.get('/showall/cat', generalAuth, async (req, res) => {
    try {
        const cats = await Cat.find({})
        res.status(200).send({
            status: 1,
            data: { cats },
            message: "category retrived succussfuly"
        })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            data: { error },
            message: "category retrived error"
        })
    }
})
router.delete('/cat/delete/:catId', generalAuth, async (req, res) => {
    try {
        const catId = req.params.catId
        const cat = await Cat.findOne({ _id: catId })
        if (!cat) throw new Error('user not found')
        await cat.remove()
        res.status(200).send({
            status: 1,
            message: "category removed succussfuly"
        })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            message: "category removed error"
        })
    }

})
router.patch('/cat/edit/:catId', generalAuth, async (req, res) => {
    avlUpdates = ["name"]
    const keys = Object.keys(req.body) // [name]
    const flag = keys.every((k) => avlUpdates.includes(k))  //name true 
    if (!flag) return res.send({
        status: 0,
        message: "invalid update keys",
        data: ""
    }) 
    try {
        const catId = req.params.catId
        const cat = await Cat.findOne({ _id: catId })
        keys.forEach((k) => {
            cat[k] = req.body[k] 
        })
        await cat.save()
        res.send({
            status: 1,
            message: "updated",
            data: cat
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: 'error in edit',
            data: ''
        })
    }
})
module.exports = router