const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const morgan = require('morgan');

//.env file parser
require ('dotenv').config()

//create express app
const app = express();

//body parser middleware
app.use(express.json());
// app.use(morgan('short'));

//routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

//serve static assets in production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));


  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}

//port
const PORT = process.env.PORT || 5000;

//databse connection
mongoose.
  connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch(err => console.log(err));

//loggin for debug and testing purposes
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () =>{console.log('Database open!')})
