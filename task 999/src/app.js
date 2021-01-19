const express = require('express')
require('./db/mongoose')
const app = express()
const x = process.env.PORT || 3000
app.use(express.json())
app.listen(port)


