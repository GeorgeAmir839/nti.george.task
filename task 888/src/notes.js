const express = require('express')
const app = express()
const hbs = require('hbs')
const x = 7000
const path = require('path')
const getapidata = require('./utils/api')

const publicdir = path.join(__dirname, '../public') //deh 34an y3rf mkan alfolder dah 1
const viewsdir = path.join(__dirname, '../template/views')
const partialdir = path.join(__dirname, '../template/partials')//2

app.set('view engine', 'hbs')
app.set('views', viewsdir)
hbs.registerPartials(partialdir)//deh mktbam4 fe alo8a 3mlha 34an a7ot almtkrr gwaha wb2olo ro7 ast5dmo 2
app.use(express.static(publicdir)) //deh 34an yt3amil m3 mlfat hbs w y3f yara ale feha 1



app.get('', (req, res) => {
    getapidata.getAllData((error, data) => {
        if (error) {
            pageData = []
            error = true
        }
        else {
            pageData = data.articles
            error = false
        }
        res.render('index', { pageData, error })
    })
})


app.get('*', (req, res) => {
    res.render('404', { massege: 'error' })
})

app.listen(x, () => {
    console.log('server on localhost:3000')
})