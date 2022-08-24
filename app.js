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
require('./config/mongoose')

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

app.get('/home', (req, res) => {
    return Item.find()
        .lean()
        .then(items => res.render('index', { items }))
        .catch(error => console.error(error))
})

app.get('/', (req, res) => {
    res.redirect('/login')
})
//login page

app.get('/login', (req, res) => {
    res.render('login')
})
//log out
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')

})

//register
app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/login', passport.authenticate('local', { 
      failureRedirect: '/login', 
      successRedirect: '/home'
    }))

//new item page
app.get('/new', (req, res) => {
    res.render('newItem')
})

//add new item
app.post('/new', (req, res) => {
    const { name, number, date } = req.body

    return Item.create({ name, number, date })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})
//view detail
app.get('/item/:id', (req, res) => {

    const _id = req.params.id
    return Item.findOne({ _id })
        .lean()
        .then((item) => res.render('detail', { item }))
        .catch(error => console.error(error))
})

//update item page
app.get('/item/edit/:id', (req, res) => {
    const _id = req.params.id
    return Item.findOne({ _id })
        .lean()
        .then((item) => res.render('edit', { item }))
        .catch(error => console.error(error))
})

//update item
app.put('/item/:id', (req, res) => {
    const _id = req.params.id
    const { name, date, number } = req.body
    return Item.findOne({ _id })
        .then((item) => {
            item.name = name
            item.date = date
            item.number = number
            return item.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

//delete item
app.delete('/item/:id/', (req, res) => {
    const _id = req.params.id
    return Item.findOne({ _id })
        .then((item) => {
            return item.remove()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

app.listen(port, () => {
    console.log(`app is on http://localhost:${port}`)
})