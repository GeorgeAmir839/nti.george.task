const express = require('express')
const Student = require('../module/student')
const studentAuth = require('../middleware/authStudent')
const teacherAuth = require('../middleware/authTeacher')
const generalAuth = require('../middleware/authGeneral')
const multer = require('multer')
const router = new express.Router()
var uniqueImageName
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    limits: { fileSize: 147852222 },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|pdf)$/)) {
            return cb(new Error('invalid extension'))
        }
    },
    filename: function (req, file, cb) {
        uniqueImageName = 'studentImg' + '-' + Date.now() +
            (file.originalname.match(/\.(jpg|png|pdf)$/)[0])
        cb(null, uniqueImageName)
    }
})
var upload = multer({ storage })
router.post('/up', upload.single('upload'), async (req, res) => {
    res.send('done')
})

router.post('/student/add', upload.single('profile'), async (req, res) => {
    const student = new Student(req.body)
    try {
        student.img = `images/${uniqueImageName}`
        await student.save()
        const token = await student.generateToken()
        res.send({
            status: 1,
            message: 'data inserted successfuly',
            data: { student, token }
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: 'data inserting error',
            data: e
        })
    }
})

router.post('/student/login', async (req, res) => {

    try {
        const student = await Student.findByCredintials(req.body.email, req.body.password)
        const token = await student.generateToken()
        res.send({
            status: 1,
            message: 'valied login',
            data: { student, token }
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

router.get('/showAll', studentAuth, async (req, res) => {
    try {
        students = await Student.find({})
        res.status(200).send({
            status: 1,
            data: { students },
            message: "data retrived succussfuly"
        })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            data: { error }, message: "error loading data"
        })
    }
})
router.get('/student/profile', generalAuth, async (req, res) => {
    try {
        res.status(200).send({
            status: 1,
            data: { 'req.student': req.student },
            message: "data retrived succussfuly"
        })
    }
    catch (error) {
        res.send({
            status: 0,
            data: { error },
            message: "error loadin profile"
        })
    }

})
router.get('/student/single/:studentid', generalAuth, async (req, res) => {
    studentid = req.params.studentid
    try {
        studentData = await Student.findById(studentid)
        if (!studentData) return res.send({
            status: 2,
            message: 'not found',
            data: ''
        })
        res.send({
            status: 1,
            message: 'student data retriverd',
            data: studentData

        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: 'data retrive error',
            data: e
        })
    }

})

router.patch('/student/edit/:studentId', generalAuth, async (req, res) => {

    avlUpdates = ["name", "age", "password", "email", "img"]
    const keys = Object.keys(req.body) // [name]
    const flag = keys.every((k) => avlUpdates.includes(k))  //name true 
    if (!flag) return res.send({
        status: 0,
        message: "invalid update keys",
        data: ""
    })
    try {
        const studentId = req.params.studentId
        const student = await Student.findOne({ _id: studentId })
        keys.forEach((k) => {
            student[k] = req.body[k]
        })
        await student.save()
        res.send({
            status: 1,
            message: "updated",
            data: student
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
router.delete('/user/delete/me',generalAuth, async (req, res) => {
    try {
        await req.student.remove()
        res.send('removed')
    }
    catch (error) { res.send(error) }
})
router.delete('/student/delete/:studentid', generalAuth, async (req, res) => {
    try {
        const student = await Student.findOne(req.params.studentid)
        if (!student) throw new Error('user not found')
        await user.remove()
        res.send('removed')
    }
    catch (e) {
        res.send({
            status: 0,
            message: 'error in delete'
        })
    }
})

router.post('/student/logout', generalAuth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((singletoken) => {
            return singletoken.token !== req.token
        })
        await req.student.save()
        res.send({
            status: 1,
            message: "logged out"
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: "cann't logout"
        })
    }
})

router.post('/student/logoutall', generalAuth, async (req, res) => {
    try {
        req.student.tokens = []
        await req.student.save()
        res.send({
            status: 1,
            data: {},
            message: 'logged out successfuly'
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: "cann't logout"
        })
    }
})
router.post('/admin/editType/:userId', studentAuth, async (req, res) => {
    try {
        const studentId = req.params.studentId
        const student = await Student.findOne({ _id: studentId })
        if (!student) throw new Error('user not found')
        student.UserSchemaType = !student.UserSchemaType
        await student.save()
        res.send('EDITED')
    }
    catch (error) {
        res.send(error)
    }
})

module.exports = router