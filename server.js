if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
require('./db/mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(expressLayouts)
app.use(express.static('public '))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)