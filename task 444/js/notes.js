const express = require('express')
const app = express()
const x = 3000
const path = require('path')

const publicdir = path.join(__dirname,'../public')
app.use(express.static(publicdir))

const cssdir = path.join(__dirname,'../css')
app.use(express.static(cssdir))

app.get('',(req,res)=>{
    res.send('hello')
})
app.get('/about',(req,res)=>{
    res.send('hhfffffffffffffhfhfh')
})

app.listen(x,()=>{
    console.log('server on localhost:3000')
})