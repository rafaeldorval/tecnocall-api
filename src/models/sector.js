const mongoose = require('mongoose');

const Sector = mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Sector', Sector)