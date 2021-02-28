const mongoose = require('mongoose')
const validator = require('validator')


const CategorySchema = new mongoose.Schema({
    name : {
        required:true,
        trim:true,
        type:String
    }
},{timestamps:true}
)

CategorySchema.virtual('bookcat',{
    ref:'Book',
    localField:'_id',
    foreignField:'categorys.category'
})

const Cat = mongoose.model('category',CategorySchema)
module.exports = Cat