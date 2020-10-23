const mongoose = require('mongoose')

// Configuring the DB
//Get Mongoose to use the global promise library
mongoose.Promise = global.Promise

// Set up default mongoose connection
mongoose.connect('mongodb+srv://ranganathmd:uOgKDhu9ZAhmOrnv@developeracc.xzfvx.mongodb.net/saveyourcontact?retryWrites=true&w=majority',
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