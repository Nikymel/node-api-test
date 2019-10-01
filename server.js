const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/userAPI');
const User = require('./models/userModel');

const PORT = process.env.PORT || 8000;

// Parse incoming messages to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Adding the user Router
const userRouter = require('./routes/userRouter')(User);

app.use('/api', userRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log('Startup successful!');
});
