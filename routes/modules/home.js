const express = require('express')
const router = express.Router()
const Item = require('../../models/item')



router.get('/', (req, res) => {
    return Item.find()
    .lean()
    .then(items => res.render('index', { items }))
    .catch(error => console.error(error))
})



module.exports = router