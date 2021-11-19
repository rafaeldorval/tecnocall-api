const mongoose = require('mongoose');

const User = mongoose.Schema({
  description: {
    type: String,
    index: true,
  },
  phoneNumber: {
    type: String,
    index: true,
  },
  destinedForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    index: true,
  },
  read: {
    type: Boolean,
    index: true,
    default: false,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', User)