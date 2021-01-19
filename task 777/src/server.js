const path = require('path')
const hbs = require('hbs')
const express = require('express')
const getapidata = require('./utils/getapidata') 

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../template/views')
const partialsDirectory = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
  getapidata( ( error , data ) => {
    if(error) {
        pageData = []
        error = true
    }
    else{
        pageData = data.articles
        error = false
    }
    res.render('index', { pageData, error })
  })  
})


app.listen(3000)