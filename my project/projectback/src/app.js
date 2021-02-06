const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const studentRoutes = require('./routes/studentsdata')
const teacherRoutes = require('./routes/teachersdata')
const app = express()
const x = process.env.PORT || 6000

app.use(express.json())
app.use(cors())
app.use(studentRoutes)
app.use(teacherRoutes)
app.listen(x)