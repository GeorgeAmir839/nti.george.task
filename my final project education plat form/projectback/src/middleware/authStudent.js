const jwt = require('jsonwebtoken')
const Student = require('../module/student')
const Teacher = require('../module/teacher')
const auth = async(req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.verify( token , 'finalProject' )
        const student = await Student.findOne({_id:decodedToken._id, 'tokens.token': token, StudentSchemaType:true})
        const teacher = await Teacher.findOne({_id:decodedToken._id, status:true})
        if(!student){ throw new Error() }/* !teacher|| */
        console.log("bbbb")
        req.student = student
        req.teacher = teacher
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
