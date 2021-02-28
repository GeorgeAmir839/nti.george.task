const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const UserRoutes = require('./routes/userdata')
const categoryRoutes = require('./routes/catdata')
const bookRoutes = require('./routes/bookdata')

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(cors())
app.use(UserRoutes)
app.use(categoryRoutes)
app.use(bookRoutes)
app.listen(port)