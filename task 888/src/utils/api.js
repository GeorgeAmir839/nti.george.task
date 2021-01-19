
const request = require('request')

const getAllData = (cb) => {
    const url = `http://newsapi.org/v2/top-headlines?country=eg&category=health&apiKey=702e9ad75b684b2ba13de7a0b5cf6ba3`

    request({ url, json:true }, (err, data) => {
        if(err){
            cb('server error', undefined)
        }
        else{
            cb(undefined, data.body)
        }
    })
}
const getSingle = (postId, cb) =>{
    const url = `http://newsapi.org/v2/top-headlines?country=eg&category=health&apiKey=702e9ad75b684b2ba13de7a0b5cf6ba3/${postId}`
    request({ url, json:true }, (err, data) => {
        if(err){
            cb('server error', undefined)
        }
        else{
            cb(undefined, data.body)
        }
    })
}

module.exports = {getAllData, getSingle}