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

// const add = (a,b)=>{
//     return new Promise ((resolve /* byrg3 7gten ya 7l*/, reject/* ya erroe */)=>{
//         setTimeout(()=> {resolve(a+b)}, 2500 )
//     })
// }

// add(5,3).then((sum)=>{   //resolve(8) => sum = 8
//     console.log(sum)   //8

// })
// const fs = require('fs')
// // fs.writeFileSync('bnjj.json','jjhjhhjjh')
// hghghhg =  fs.readFileSync('bnjj.json')
// console.table(JSON.parse(hghghhg))

const fs = require('fs')
data = [{ "name": "george", "balance": 24, "accountnumber": 4000 }]
// fs.writeFileSync('notes1.json',JSON.stringify(data))  //kda 34an ad5lo fe json alfile kdakda ale da5el mne w 5arg byba BUFFER 
/* readfilesync bt2ra ale fo almlf bsssss btl3oo BUFFER */
ali = fs.readFileSync('notes1.json').toString() //kda 34an a7wlo mn BUFFER lstring mlha4 lzma dlwate lany momkn a7wlha ljson 3la tol json.parse
// JSON.parse(fs.readFileSync('notes1.json').toString()) 
// console.log(JSON.parse(ali))
dataa = []

if ((ali).length == 0) {

    fs.writeFileSync('notes1.json', JSON.stringify(dataa))
}else{
    let data = JSON.parse(ali)
    data.push({ "name": "marwa", "balance": 28, "accountnumber": 5000 })
    console.log(data)
    fs.writeFileSync('notes1.json', JSON.stringify(data))
}

/*  awel treaa adef baha 7aga bktbha 3n tre al push b3d kda try catch
// if ((ali).length == 0) {

//     fs.writeFileSync('notes1.json', JSON.stringify(data))
// }else{
//     let data = JSON.parse(ali)
//     data.push({ "name": "marwa", "balance": 28, "accountnumber": 5000 })
//     console.log(data)
//     fs.writeFileSync('notes1.json', JSON.stringify(data))
// }
*/