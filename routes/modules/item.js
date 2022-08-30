const express = require('express')
const router = express.Router()
const Item = require('../../models/item')
const state = {
    家居物業: `630c4dbc4b49bd306f0ede58`,
    交通出行: `630c4dbc4b49bd306f0ede59`,
    休閒娛樂: `630c4dbc4b49bd306f0ede5a`,
    餐飲食品: `630c4dbc4b49bd306f0ede5b`,
    其他: `630c7089235ff42a4656271c`
}



//new item page
router.get('/new', (req, res) => {
    res.render('newItem')
})

//add new item
router.post('/new', (req, res) => {
    const errors = []
    const { name, number, date, categoryId } = req.body
    const userId = req.user._id
    console.log(categoryId)
    if(!name|| !number || !date || !categoryId){
        errors.push({ message: '全部都是必填欄位' })
    }
    if (errors.length) {
        return res.render('newItem', {
          errors,
          name,
          number,
          date,
          categoryId
        })
      }

    return Item.create({ name, number, date, userId, categoryId })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

//update item page
router.get('/edit/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    
    return Item.findOne({ _id, userId })
        .populate('categoryId')
        .lean()
        .exec((err, item) => {
            res.render('edit', { item })
        })
})

//update item
router.put('/:id', (req, res) => {
    const errors = []
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, number, categoryId } = req.body

    if(!name|| !number || !date || !categoryId){
        errors.push({ message: '全部都是必填欄位' })
    }
    if (errors.length) {
        return res.render('newItem', {
          errors,
          name,
          number,
          date,
          categoryId
        })
      }
      
    return Item.findOne({ _id, userId })
        .then((item) => {
            item.name = name
            item.date = date
            item.number = number
            item.categoryId = categoryId
            return item.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

//delete item
router.delete('/:id/', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.findOne({ _id, userId })
        .then((item) => {
            return item.remove()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})
//家居物業
router.get('/house', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.find({ userId })
        .populate('categoryId')
        .lean()
        .exec((err, items) => {
            items = items.filter((item)=> {
                if(item.categoryId._id.toString() === state.家居物業){
                    return item
                }
            }) 
            res.render('index', { items })
        })
})
//交通出行
router.get('/transportation', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.find({ userId })
        .populate('categoryId')
        .lean()
        .exec((err, items) => {
            items = items.filter((item)=> {
                if(item.categoryId._id.toString() === state.交通出行){
                    return item
                }
            }) 
            res.render('index', { items })
        })
})
//休閒娛樂
router.get('/entertainment', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.find({ userId })
        .populate('categoryId')
        .lean()
        .exec((err, items) => {
            items = items.filter((item)=> {
                if(item.categoryId._id.toString() === state.休閒娛樂){
                    return item
                }
            }) 
            res.render('index', { items })
        })
})
//餐飲食品
router.get('/food', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.find({ userId })
        .populate('categoryId')
        .lean()
        .exec((err, items) => {
            items = items.filter((item)=> {
                if(item.categoryId._id.toString() === state.餐飲食品){
                    return item
                }
            }) 
            res.render('index', { items })
        })
})
//其他
router.get('/other', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Item.find({ userId })
        .populate('categoryId')
        .lean()
        .exec((err, items) => {
            items = items.filter((item)=> {
                if(item.categoryId._id.toString() === state.其他){
                    return item
                }
            }) 
            res.render('index', { items })
        })
})



module.exports = router