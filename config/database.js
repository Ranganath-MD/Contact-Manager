const mongoose = require('mongoose')

// Configuring the DB
//Get Mongoose to use the global promise library
mongoose.Promise = global.Promise

// Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/CM',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
.then(function(){
    console.log('connected to db')
})
.catch(function(err){
    console.log('something went wrong in DB connetion')
})

module.exports = {
    mongoose
}