const express = require('express')
const Teacher = require('../module/teacher')
const studentAuth = require('../middleware/authStudent')
const teacherAuth = require('../middleware/authTeacher')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()

router.post('/add/teacher', async (req, res) => {
    const teacher = new Teacher(req.body)
    try {
        
        await teacher.save()
        const token = await teacher.generateToken()
        res.send({
            status: 1,
            data:{teacher,token},
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
router.post('/teacher/login', async (req, res) => {
    console.log('0')
    try {
        const teacher = await Teacher.findByCredintials(req.body.name, req.body.password)
        const token = await teacher.generateToken()
        res.send({
            status: 1,
            message: 'valied login',
            data: { teacher, token }
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: 'invalid login',
            data: e
        })
    }
})

router.get('/teacher/me',generalAuth, async(req, res)=>{
    try{
        res.send({
            status:1,
            data:{'req.user':req.teacher},
            message:"retrived"
        })    
    }
    catch(error){
        res.send({status:0, data:{error}, message:"error loadin profile"})
    }
})

router.get('/showall/teacher', generalAuth, async (req, res) => {
    try {
        const teacher = await Teacher.find({})
        res.status(200).send({
            status: 1,
            data: { teacher },
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
router.post('/confirmType/:teacherId',generalAuth, async(req,res)=>{
    try{
        const teacherId = req.params.teacherId
        const teacher = await Teacher.findOne({_id:teacherId})
        if(!teacher) throw new Error('user not found')
        teacher.status = true
        await teacher.save()
        res.send('CONFIRM')
        }
        catch(error){
            res.send(error)
        }
})
module.exports = router