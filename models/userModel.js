const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  username: { type: String },
  name: { type: String },
  age: { type: Number },
});

module.exports = mongoose.model('User', userModel);