const express = require('express')
const router = express.Router()
const { authenticateUser } = require("../middlewares/authentication")
const { Contact } = require('../models/Contact')

// localhost:3005/contacts
router.get('/', authenticateUser, function (req, res) {
    // Contact.find({ user: req.user._id})
    Contact.find()
        .then(function (contacts) {
            res.send(contacts)
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/', authenticateUser, function (req, res) {
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
        .then(function (contact) {
            res.send({
                message: "Successfully added your contact",
                contact
            })
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.get('/:id',authenticateUser, function (req, res) {
    const id = req.params.id
    // find operation
    Contact.findOne({
        user: req.user._id,
        _id: id
    })
    .then(function (contact) {
            if (contact) { // if contact is found in DB
                res.send(contact)
            } else { // else contact not found in DB, send empty {}
                res.send({})
            }
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.delete('/:id', authenticateUser, function (req, res) {
    const id = req.params.id
    Contact.findOneAndDelete({
        user: req.user._id,
        _id: id
    })
        .then(function (contact) {
            res.send(contact)
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, function (req, res) {
    const id = req.params.id
    const body = req.body
    // findByIdAndUpdate - by default will not run validations
    // new - return the newly updated record, runValidators - to run validations while updating
    Contact.findOneAndUpdate({
        user: req.user._id,
        _id: id
    }, { $set: body }, { new: true, runValidators: true })
        .then(function (contact) {
            res.send(contact)
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = {
    contactsRouter: router
}