const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true, 
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    category:[
        {
            catId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Category',
                required:true,
                trim:true
            }
        }
    ],
    nOfPages:{
        type:Number,
        required:true,
        validate(value){
            if(value<60) throw new Error('Book must be more than 60 papers')
        }
    },
    status:{
        default:false,
        type: Boolean
    }
},
{timestamps:true}
)

// bookSchema.pre('save', async function(req, res, next){
// try{
//     console.log(1)
//     book = this 
//     user = req.user
//     console.log(user)
// }
// catch(e){
//     console.log(e)
// }
//     next()
// })
const Book = mongoose.model('Book', bookSchema)
module.exports= Book