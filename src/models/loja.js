const mongoose = require('mongoose');

const Loja = mongoose.Schema({
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

module.exports = mongoose.model('Loja', Loja)