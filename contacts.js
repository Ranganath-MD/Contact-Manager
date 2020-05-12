const express = require('express')
const cors = require('cors')
const { mongoose } = require('./config/database')
const { contactsRouter  } = require('./app/controllers/ContactsController')
const { usersRouter } = require('./app/controllers/UsersController')

const port = 3005
const app = express() 

app.use(express.json())
app.use(cors())

app.get('/', function(req, res){
    res.send('<h2>Welcome to contact manager</h2>')
})

app.use('/contacts', contactsRouter)
app.use('/users', usersRouter)


app.listen(port, function(){
    console.log('listening on port', port)
})