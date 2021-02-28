const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const studentRoutes = require('./routes/studentsdata')
const teacherRoutes = require('./routes/teachersdata')
const subRoutes = require('./routes/subdata')
const app = express()
const x = process.env.PORT || 7000

app.use(express.json())
app.use(cors())
app.use(studentRoutes)
app.use(teacherRoutes)
app.use(subRoutes)
app.listen(x)