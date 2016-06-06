const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})