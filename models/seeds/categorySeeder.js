const db = require("../../config/mongoose")
const Category = require('../category')
const CATEGORY = {
  家居物業: `fa-house`,
  交通出行: `fa-van-shuttle`,
  休閒娛樂: `fa-face-grin-beam`,
  餐飲食品: `fa-utensils`,
  其他: `fa-pen`
}


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  return Promise.all(
    Array.from(Object.entries(CATEGORY),
      (value, i) => Category.create({ name: value[0], img: value[1] })
    ))
    .then(() => {
      console.log("done")
      process.exit()
    })
})
