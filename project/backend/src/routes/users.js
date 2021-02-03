const express = require('express')
const User = require('../models/users')
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
router.post('/user/register',upload.single('profile'), async(req, res)=>{
    const user = new User(req.body)
    try{
        user.image = `images/${uniqueImageName}`
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({
            status:1,
            data:{ user, token },
            message:"User Added"
        })
    }
    catch(error){
        res.status(500).send({
            status:0,
            data: {error},
            message:"error while inserting data"
        })
    }
})

router.post('/user/login', async(req,res)=>{
    try{
        const user = await User.findByCredintials(req.body.userName, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({
            status:1,
            data:{user, token},
            message:"user logged in"
        })
    }
    catch(error){
        res.status(500).send({
            status:0,
            data:{error},
            message:"error in login"
        })
    }
})

router.get('/admin/showAll', adminAuth, async(req,res)=>{
    try{
        users = await User.find({})
        res.status(200).send({
            status:1,
            data:{users},
            message:"data retrived succussfuly"
        })
    }
    catch(error){
        res.status(500).send({
            status:0,
            data:{error}, message:"error loading data"
        })
    }    
})

router.post('/user/logout',generalAuth, async(req,res)=>{
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
router.get('/user/me',generalAuth, async(req, res)=>{
    try{
        res.send({
            status:1,
            data:{'req.user':req.user},
            message:"retrived"
        })    
    }
    catch(error){
        res.send({status:0, data:{error}, message:"error loadin profile"})
    }
})

router.delete('/user/delete/me', generalAuth,async(req,res)=>{
    try{ 
        await req.user.remove()
        res.send('removed')
    }
    catch(error){res.send(error)}
})

router.delete('/admin/delete/:userId', adminAuth, async(req,res)=>{
    try{
    const userId = req.params.userId
    const user= await User.findOne({_id:userId})
    if(!user) throw new Error('user not found')
    await user.remove()
    res.send('removed')
    }
    catch(error){
        res.send(error)
    }
})

router.post('/admin/editType/:userId', adminAuth, async(req,res)=>{
    try{
        const userId = req.params.userId
        const user= await User.findOne({_id:userId})
        if(!user) throw new Error('user not found')
        user.userType = !user.userType
        await user.save()
        res.send('EDITED')
        }
        catch(error){
            res.send(error)
        }
})
module.exports = router