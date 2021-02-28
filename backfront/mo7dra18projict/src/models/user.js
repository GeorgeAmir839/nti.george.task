const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, 
        unique:true,
        trim:true,
        // validate(value){
        //     if(!validator.isAlphanumeric(value,['en-US'])){
        //         throw new Error('not valid')
        //     }
        // }
    },
    phone : {
        required:true,
        trim:true,
        type:String,
        // validate(value){
        //     if(!validator.isMobilePhone(value,['sk-SK', 'sr-RS'])){
        //         throw new Error('not valid')
        //     }
        // }
        
    },
    age : {
        type:String,
        validate(value){
            if(value<15) throw new Error('invalid value')
        }
        
    },
    img : {
        type:String,
        default:"-"
    },
    password : {
        required:true,
        trim:true,
        type:String
    },
    UserSchemaType:{
        type:Boolean,
        required:true
    },
    tokens:[{token:{
        type:String
    }}]
},{timestamps:true}
)

UserSchema.virtual('UserSchemabook',{
    ref:'Book',
    localField:'_id',
    foreignField:'author'
})

UserSchema.methods.toJSON = function(){
    const user = this
    userObject = user.toObject()
    // delete userObject._id
    // delete userObject.tokens
    // delete userObject.password
    return userObject
}

UserSchema.methods.generateToken = async function(){
    const user = this
    //{_id:254455555}
    const token = jwt.sign({_id:user._id.toString()}, 'finalProject')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.statics.findByCredintials = async(name, password)=>{
    const user = await User.findOne({name})
    if(!user) throw new Error('not allowed')
    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass) throw new Error('not allowed')
    return user
}

UserSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){ user.password = await bcrypt.hash(user.password, 15)}
    next()
})



const User = mongoose.model('User',UserSchema )
module.exports = User 