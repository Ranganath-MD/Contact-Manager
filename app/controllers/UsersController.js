const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication')

// localhost:3005/users/register
router.post('/register', function (req, res) {
    const body = req.body
    User.exists({ email: body.email })
    .then(user => {
        if (user) {
            res.send({ message: "user already exists" })
        } else {
            const user = new User(body)
            user.save()
                .then(user => {
                    res.send({
                        message: "Successfully registered",
                        user
                    })
                })
                .catch(err => {
                    res.send(err.message)
                })
        }
    })
})

// localhost:3005/users/login
router.post('/login', function (req, res) {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken()
        })
        .then(function (user) {
            res.send({
                message: "Successfully Logged in",
                user
            })
        })
        .catch(function (err) {
            res.status('404').send(err)
        })
})

// localhost:3005/users/account
router.get('/account', authenticateUser, function (req, res) {
    const { user } = req
    res.send(user)
})


// localhost:3000/users/logout
router.delete('/logout', authenticateUser, function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}