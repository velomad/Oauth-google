const express = require('express')
const passport = require('passport')
const router = express.Router()

// auth with google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).json({
        msg:'logged out'
    })
})

module.exports =  router