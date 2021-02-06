const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const TeacherSchema =new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        trim: true,
        ref:'Student'
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        type: String,
        ref:'Subject',
        required:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 100
    },
    status:{
        // default:false,
        required: true,
        type: Boolean
    },
    tokens: [{
        token: {
            type: String
        }
    }]
},
{timestamps:true}
)

TeacherSchema.methods.generateToken = async function () {
    const teacher = this
    //{_id:254455555}
    const token = jwt.sign({ _id: teacher._id.toString() }, 'finalProject')/*  */
    teacher.tokens = teacher.tokens.concat({ token })
    await teacher.save()
    return token
}
TeacherSchema.statics.findByCredintials = async (name, password) => {
    const teacher= await teacher.findOne({name})
    if (!teacher) throw new Error('not allowed')
    const isValidPass = await bcrypt.compare(password, teacher.password)
    if (!isValidPass) throw new Error('not allowed')
    return teacher
}

TeacherSchema.pre('save', async function (next) {
    const teacher = this
    if (teacher.isModified('password')) { teacher.password = await bcrypt.hash(teacher.password, 15) }
    next()
})
const Teacher = mongoose.model('Teacher',TeacherSchema)
module.exports = Teacher
