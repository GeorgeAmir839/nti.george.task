const express = require('express')
const Sub = require('../module/subjects')
const studentAuth = require('../middleware/authStudent')
const teacherAuth = require('../middleware/authTeacher')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()
router.post('/addSub',generalAuth, async (req, res) => {
    try {
        const sub = new Sub(req.body)
        await sub.save()
        res.send({
            status: 1,
            data: { sub },
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
router.get('/showall/sub', generalAuth, async (req, res) => {
    try {
        const subs = await Sub.find({})
        res.status(200).send({
            status: 1,
            data: { subs },
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
router.delete('/sub/delete/:subId', generalAuth, async (req, res) => {
    try {
        const subId = req.params.subId
        const sub = await Sub.findOne({ _id: subId })
        if (!sub) throw new Error('user not found')
        await sub.remove()
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
router.patch('/sub/edit/:subId', generalAuth, async (req, res) => {
    avlUpdates = ["name"]
    const keys = Object.keys(req.body) // [name]
    const flag = keys.every((k) => avlUpdates.includes(k))  //name true 
    if (!flag) return res.send({
        status: 0,
        message: "invalid update keys",
        data: ""
    }) 
    try {
        const subId = req.params.subId
        const sub = await Sub.findOne({ _id: subId })
        keys.forEach((k) => {
            sub[k] = req.body[k] 
        })
        await cat.save()
        res.send({
            status: 1,
            message: "updated",
            data: sub
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