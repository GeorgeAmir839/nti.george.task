const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Book = require('../models/book')
const auth = async(req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.verify( token , "finalProject" )
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token': token, UserSchemaType:true})
        const book = await Book.findOne({_id:decodedToken._id, status:true})
        if(!user||!book){ throw new Error() }
        req.book = book
        req.user = user
        req.token = token
        next()
    }
    catch(error){
        res.send({
            data:{error},
            message:'please authintcate',
            status: 0
        })
    }
}
module.exports = auth
