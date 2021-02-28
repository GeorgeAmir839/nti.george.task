const mongoose = require('mongoose')
const validator = require('validator')

const BookSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String
    },
    author: {
        required: true,
        trim: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    /* momkn ad5l kza ktab bnfs category lma 3mlto aray mmkn kman al3ks */
    categorys: [{
        category: {
            required: true,
            trim: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cat"
        }
    }],
    numberofpages: {
        required: true,
        trim: true,
        type: Number,
        validate(value) {
            if (value < 60) throw new Error('that is not abok')
        }
    },
    status: {
        type:Boolean,
        default:false
    }
}, { timestamps: true }
)
const Book = mongoose.model('BookSchema', BookSchema)
module.exports = Book