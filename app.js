const express = require('express')
app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
require('./config/mongoose')

app.get('/', (req,res) => {
    res.render('home')
})

app.post('/', (req, res) => {
    console.log('req.body', req.body)
    res.render('index')
  })



app.listen(port, ()=>{
    console.log(`app is on http://localhost:${port}`)
})