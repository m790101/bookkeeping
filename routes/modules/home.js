const express = require('express')
const router = express.Router()
const Item = require('../../models/item')



router.get('/', (req, res) => {
    const userId = req.user._id
    return Item.find({userId})
    .lean()
    .sort({_id: 'asc'})
    .then(items => res.render('index', { items }))
    .catch(error => console.error(error))
})



module.exports = router