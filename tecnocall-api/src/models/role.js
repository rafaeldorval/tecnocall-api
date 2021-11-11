const mongoose = require('mongoose');

const Role = mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Role', Role)