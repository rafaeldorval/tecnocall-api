const mongoose = require('mongoose');

const Sector = mongoose.Schema({
  cod: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    index: true,
    uppercase: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Sector', Sector)