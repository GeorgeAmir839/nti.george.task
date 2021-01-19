const { error } = require('console')
const mongoose = require('mongoose')
const validator = require('validator')

const user = mongoose.model('user',{
    name:{
        type: String,
        required:true,
        trim:true,
        minlenght:2,
        maxlenght:35
    },
    age:{
        type: Number,
        default:15,
        validate(value){
            if(value<15)throw new Error('INVALID AGEE')
        }
    },
    email:{        
        type: String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minLength:6,
        maxLength:100
    }
})

module.exports = user