const mongoose = require('mongoose')

const CatSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    }
},
{ timestamps:true }
)
CatSchema.virtual('bookCategories',{
    ref:'Book',
    localField:'_id',
    foreignField:'category.catId'
})
const Category = mongoose.model('Category',CatSchema)

module.exports = Category
