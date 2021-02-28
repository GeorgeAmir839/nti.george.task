const mongoose = require('mongoose')

const SubSchema = new mongoose.Schema({
    name : {
        required:true,
        trim:true,
        type:String
    }
},{timestamps:true}
)

SubSchema.virtual('studentSub',{/*  */
    ref:'Student',
    localField:'_id',
    foreignField:'subjects.subject'
})

const Sub = mongoose.model('category',SubSchema)
module.exports = Sub