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
  cellnumber: {
    type: String,
    index: true,
  },
  loja_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loja'
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  sector_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  },
  isCentral: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', User)