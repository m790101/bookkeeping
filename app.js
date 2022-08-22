const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const { redirect } = require('express/lib/response')
const Item = require('./models/item')

app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
require('./config/mongoose')

app.get('/', (req,res) => {
    return Item.find()
    .lean()
    .then(items =>res.render('index',{items}))
    .catch(error => console.error(error))
})

app.get('/new', (req,res) => {
    res.render('newItem')
})

//add new item
app.post('/new', (req,res) => {
    const{name, number, date}= req.body

    return Item.create({name, number, date})
    .then(()=> res.redirect('/'))
    .catch(error =>console.error(error))
})

app.listen(port, ()=>{
    console.log(`app is on http://localhost:${port}`)
})