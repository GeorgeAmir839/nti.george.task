const express = require('express')
const Teacher = require('../module/teacher')
const studentAuth = require('../middleware/authStudent')
const teacherAuth = require('../middleware/authTeacher')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()

router.post('/add/teacher', async (req, res) => {
    try {
        const teacher = new Teacher(req.body)
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
// router.get('/teacher/add', (req, res) => {
//     try {
//         // res.send('test')
//         const teacher = new Teacher({
//             ...req.body,
//             name: req.student._id
//         })
//         if(req.student.StudentSchemaType == true) teacher.status=true
//         else teacher.status = false
//         await teacher.save()
//         res.send({
//             status: 1,
//             message: 'added',
//             data: teacherData
//         })
//     }
//     catch (e) {
//         res.send({
//             status: 0,
//             message: 'error adding',
//             data: e
//         })
//     }
// })

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