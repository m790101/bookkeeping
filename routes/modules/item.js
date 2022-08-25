const express = require('express')
const router = express.Router()
const Item = require('../../models/item')



//new item page
router.get('/new', (req, res) => {
    res.render('newItem')
})

//add new item
router.post('/new', (req, res) => {
    const { name, number, date } = req.body
    const userId = req.user._id
    return Item.create({ name, number, date, userId})
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})
//view detail
router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.findOne({ _id, userId })
        .lean()
        .then((item) => res.render('detail', { item }))
        .catch(error => console.error(error))
})

//update item page
router.get('/edit/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.findOne({ _id ,userId})
        .lean()
        .then((item) => res.render('edit', { item }))
        .catch(error => console.error(error))
})

//update item
router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, number } = req.body
    return Item.findOne({ _id, userId })
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
router.delete('/:id/', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.findOne({ _id, userId})
        .then((item) => {
            return item.remove()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

module.exports = router