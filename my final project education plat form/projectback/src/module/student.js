const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 500,
        trim: true,
        // validate(value){
        //     if(!validator.isAlphanumeric(value,['en-US'])){
        //         throw new Error('not valid')
        //     }
        // }
    },
    // academicyear:{
    //     type: String,
    //     required: true
    // },
    educationlevel:{
        type: String,
        required: true
    },
    subjects: [{
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sub",
            
        }
    }],
    img: {
        type: String,
        default: "-"
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    password: {
        required: true,
        trim: true,
        type: String
    },
    StudentSchemaType: {
        type: Boolean,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]
}, { timestamps: true }
)

StudentSchema.virtual('StudentToSub', {
    ref: 'Teacher',
    localField: '_id',
    foreignField: 'teacher'/* httt8yer */
})

StudentSchema.virtual('StudentNameTeacher', {
    ref: 'Teacher',
    localField: '_id',
    foreignField: 'name'
})

StudentSchema.methods.toJSON = function () {
    const student = this
    studentObject = student.toObject()
    // delete studentObject._id
    // delete studentObject.tokens
    // delete studentObject.password
    return studentObject
}

StudentSchema.methods.generateToken = async function () {
    const student = this
    //{_id:254455555}
    const token = jwt.sign({ _id: student._id.toString() }, 'finalProject')/*  */
    student.tokens = student.tokens.concat({ token })
    await student.save()
    return token
}
StudentSchema.statics.findByCredintials = async (email, password) => {
    const student = await Student.findOne({ email })
    if (!student) throw new Error('not allowed')
    const isValidPass = await bcrypt.compare(password, student.password)
    if (!isValidPass) throw new Error('not allowed')
    return student
}

StudentSchema.pre('save', async function (next) {
    const student = this
    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 15)
    }
    next()
})



const Student = mongoose.model('Student', StudentSchema)
module.exports = Student
