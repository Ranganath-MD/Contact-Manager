const { User } = require('../models/User')

const authenticateUser = function (req, res, next) {
    if (req.header("Authorization") === undefined) {
        res.send({
            message : "You are not allowed to access this page, Login again"
        })
    } else {
        var token = req.header('Authorization').replace("Bearer ", "")
    }
    User.findByToken(token)
        .then(function (user) {
            if (user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({ notice: 'token not available' })
            }

        })
        .catch(function (err) {
            res.status('401').send(err)
        })
}

module.exports = {
    authenticateUser
}