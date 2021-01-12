// const { Console } = require("console")
// const { require } = require("yargs")

// console.log("hello")
// setTimeout(()=>{
//     console.log("he")
// },3000)
// console.log("ffff")

// const request = require('request')
// data = ""
// const url = "https://jsonplaceholder.typicode.com/users"
// request({url},(err,res)=>{
//     data = JSON.parse(res.body)
//     console.table(data)
// })

// const add = (a,b,callback) =>{
//     sum=0
//     setTimeout(()=>{
//         callback(a+b)
//     },2000)

    
// }
// add(10,15,(i)=>{
//     console.log(i)
// })

const add = (a,b)=>{
    return new Promise ((resolve /* byrg3 7gten ya 7l*/, reject/* ya erroe */)=>{
        setTimeout(()=> {resolve(a+b)}, 2500 )
    })
}

