const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const { redirect, render } = require('express/lib/response')
const Item = require('./models/item')
const User = require('./models/user')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const passport = require('passport')
const flash = require('connect-flash')
require('./config/mongoose')
const routes = require('./routes')

app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
})

app.use(routes)


app.listen(port, () => {
    console.log(`app is on http://localhost:${port}`)
})