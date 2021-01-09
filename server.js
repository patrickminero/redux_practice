const express = require('express');
const mongoose = require('mongoose');
const boduParser = require('body-parser');
const morgan = require('morgan')
require ('dotenv').config()
const items = require('./routes/api/items')
const app = express();

//body parser middleware
app.use(boduParser.json());
app.use(morgan('dev'))
app.use('/api/items', items)

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

//
mongoose.
  connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch(err => console.log(err));

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () =>{console.log('Database open!')})