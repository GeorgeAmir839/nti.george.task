const request = require('request')
const getData = (callback)=>{
    const url = `http://newsapi.org/v2/top-headlines?country=eg&category=health&apiKey=702e9ad75b684b2ba13de7a0b5cf6ba3`
    request({ url, json:true }, (error, response )=>{
        if(error) {
            callback('el code 8lt', undefined)
        }
        else{
            callback(undefined, response.body)
        }
    })
}
module.exports = getData