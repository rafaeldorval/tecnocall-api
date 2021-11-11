const mongoose = require('mongoose');

const User = mongoose.Schema({
  codFenix: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    index: true,
  },
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    index: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  sector_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', User)