const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')



//log in
router.get('/login', (req, res) => {
    res.render('login')
})
//log out
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已成功登出。')
    res.redirect('/user/login')

})

//register
router.get('/register', (req, res) => {
    res.render('register')
})

//register
router.post('/register', (req,res) => {
    const errors = []
    const { email, password, passwordConfirm} = req.body

    if(!email|| !password || !passwordConfirm){
        errors.push({ message: '全部都是必填欄位' })
    }
    if(password !== passwordConfirm){
        errors.push({ message: '密碼與確認密碼不相符！' })
    }

    if (errors.length) {
        return res.render('register', {
          errors,
          email,
          password,
          passwordConfirm
        })
      }
      User.findOne({ email}).then(user => {
        if (user) {
          errors.push({ message: '這個 Email 已經註冊過了。' })
          return res.render('register', {
            errors,
            email,
            password,
            passwordConfirm
          })
        }

        return bcrypt
        .genSalt(10) 
        .then((salt) => bcrypt.hash(password,salt))
        .then((hash) =>User.create({
          email,
          password: hash,
        }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      })
    
})

router.post('/login', passport.authenticate('local', { 
      failureRedirect: '/user/login', 
      failureFlash: true,
      successRedirect: '/'
    }))

module.exports = router