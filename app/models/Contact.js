const mongoose = require('mongoose')
// create a schema
const Schema = mongoose.Schema // const { Schema } = mongoose
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema)
// Contact becomes our object construction function

module.exports = {
    Contact
}