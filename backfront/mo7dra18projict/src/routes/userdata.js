const express = require('express')
const User = require('../models/user')
const userAuth = require('../middleware/authUser')
const adminAuth = require('../middleware/authAdmin')
const generalAuth = require('../middleware/authGeneral')
const multer = require('multer') 
const router = new express.Router()
var uniqueImageName
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null,'images')
    },
    limits:{fileSize:147852222},
    fileFilter:function(req, file,cb){
        if(!file.originalname.match(/\.(jpg|png|pdf)$/)){
            return cb(new Error('invalid extension'))
        }
    },
    filename: function(req,file,cb){
        uniqueImageName = 'userImg' + '-' +Date.now()+ 
        (file.originalname.match(/\.(jpg|png|pdf)$/)[0])
        cb(null,uniqueImageName)
    }
})
var upload = multer({storage})
router.post('/up', upload.single('upload'), async(req,res)=>{
    res.send('done')
})

router.post('/user/register',upload.single('profile'), async (req, res) => {
    const user = new User(req.body)
    try {
        user.img = `images/${uniqueImageName}`
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({
            status: 1,
            data: { user, token },
            message: "User Added"
        })
    }
    catch (error) {
        console.log(error)
        res.send({
            status: 0,
            data: { error },
            message: "A problem while entering data or incomplete data"
            // message: "error while inserting data or "
        })
    }
})
router.post('/user/login', async (req, res) => {

    try {
        const user = await User.findByCredintials(req.body.name, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({
            status: 1,
            data: { user, token },
            message: "valied login"
        })
    }
    catch (error) {
        res.status(500).send({
            status: 0,
            data: { error },
            meage: "invalied login"
        })
    }
})
router.get('/admin/showAll',adminAuth, async (req, res) => {
    try {
        users = await User.find({})
        res.status(200).send({
            status: 1,
            data: { users },
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
router.get('/user/profile', generalAuth, async (req, res) => {
    try {
        res.status(200).send({
            status: 1,
            data: req.user,
            message: "data retrived succussfuly"
        })
    }
    catch (error) {

    }

})
router.get('/user/single/:userid', userAuth, async (req, res) => {
    userid = req.params.userid
    try {
        userData = await User.findById(userid)
        if (!userData) return res.send({
            status: 2,
            message: 'not found',
            data: ''
        })
        res.send({
            status: 1,
            message: 'user data retriverd',
            data: userData

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
router.patch('/user/edit/:userId', generalAuth, async (req, res) => {
    
    avlUpdates = ["name", "age", "password", "phone", "img"]
    const keys = Object.keys(req.body) // [name]
    const flag = keys.every((k) => avlUpdates.includes(k))  //name true 
    if (!flag) return res.send({
        status: 0,
        message: "invalid update keys",
        data: ""
    })
    try {
        const userId = req.params.userId
        const user = await User.findOne({ _id: userId })
        keys.forEach((k) => {
            user[k] = req.body[k]
        })
        await user.save()
        res.send({
            status: 1,
            message: "updated",
            data: user
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

router.delete('/user/delete/me', generalAuth, async (req, res) => {
    try {
        await req.user.remove()
        res.send('removed')
    }
    catch (error) { res.send(error) }
})

router.delete('/admin/delete/:userId', adminAuth, async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findOne({ _id: userId })
        if (!user) throw new Error('user not found')
        await user.remove()
        res.send('removed')
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/user/logout', generalAuth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((singletoken) => {
            return singletoken.token !== req.token
        })
        await req.user.save()
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
router.post('/user/logout20',generalAuth, async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send({
            status:1,
            data:{},
            message:'logged out successfuly'
        })
    }
    catch(error){
        res.status(500).send({
            status:0,
            data:{error},
            message:"error logout user"
        })
    }
})

router.post('/user/logoutall', adminAuth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({
            status: 1,
            message: 'logged out'
        })
    }
    catch (e) {
        res.send({
            status: 0,
            message: "cann't logout"
        })
    }
})


router.post('/admin/editType/:userId', adminAuth, async(req,res)=>{
    try{
        const userId = req.params.userId
        const user= await User.findOne({_id:userId})
        if(!user) throw new Error('user not found')
        user.UserSchemaType = !user.UserSchemaType
        await user.save()
        res.send('EDITED')
        }
        catch(error){
            res.send(error)
        }
})

module.exports = router



// router.patch('/user/edit/:userid', generalAuth, async (req, res) => {
//         avlUpdates = ["name", "age"]
//         const keys = Object.keys(req.body) // [name]
//         const flag = keys.every((k) => avlUpdates.includes(k))  //name true 
//         if (!flag) return res.send({
//             status: 0,
//             message: "invalid update keys",
//             data: ""
//         })
//         try {
//             const user = await User.findByIdAndUpdate(
//                 req.params.userid,
//                 req.body,
//                 { runValidators: true }
//             )
//             if (!user) return res.send({
//                 status: 2,
//                 message: 'user not found',
//                 data: ''
//             })
//             res.send({
//                 status: 1,
//                 message: "updated",
//                 data: user
//             })
//         }
//         catch (e) {
//             res.send({
//                 status: 0,
//                 message: 'error in edit',
//                 data: ''
//             })
//         }
//     })


// router.delete('/user/delete/:userid',generalAuth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.userid)
//         if (!user) return res.send({
//             status: 2,
//             message: 'user not found'
//         })
//         res.send({
//             status: 1,
//             message: "deleted"
//         })
//     }
//     catch (e) {
//         res.send({
//             status: 0,
//             message: 'error in delete'
//         })
//     }
// })