const express = require('express')
const path = require("path")
const cors = require('cors')
const { mongoose } = require('./config/database')
const { contactsRouter  } = require('./app/controllers/ContactsController')
const { usersRouter } = require('./app/controllers/UsersController')

const port = process.env.PORT || 3005
const app = express() 

app.use(express.json())
app.use(cors())
app.use('/contacts', contactsRouter)
app.use('/users', usersRouter)

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


app.listen(port, function(){
    console.log('listening on port', port)
})