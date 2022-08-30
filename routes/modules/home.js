const express = require('express')
const router = express.Router()
const Item = require('../../models/item')
const Category = require('../../models/category')



router.get('/', (req, res) => {
    const userId = req.user._id
    return Item.find({userId})
    .populate('categoryId')
    .lean()
    .sort({_id:'asc'})
    .exec((err, items) => {
        let totalNum = 0
        items.forEach((item)=> {
            return totalNum += Number(item.number)
        })

        res.render('index', { items, totalNum })
    })
})



module.exports = router


