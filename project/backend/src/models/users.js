const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true, 
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isAlphanumeric(value,['en-US'])){
                throw new Error('not valid')
            }
        }
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number
    },
    image:{
        type:String,
        default:"-"
    },
    password:{
        type:String, trim:true, required:true
    },
    userType:{
        type:Boolean,
        required:true
    },
    tokens:[{token:{
        type:String
    }}]
},
{timestamps:true}
)

userSchema.virtual('userBooks',{
    ref:'Book',
    localField:'_id',
    foreignField:'author'
})

userSchema.methods.toJSON = function(){
    const user = this
    userObject = user.toObject()
    // delete userObject._id
    // delete userObject.tokens
    // delete userObject.password
    return userObject
}

userSchema.methods.generateToken = async function(){
    const user = this
    //{_id:254455555}
    const token = jwt.sign({_id:user._id.toString()}, 'finalProject')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredintials = async(userName, password)=>{
    const user = await User.findOne({userName})
    if(!user) throw new Error('not allowed')
    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass) throw new Error('not allowed')
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User