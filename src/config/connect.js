const mongoose = require('mongoose')
const URL = 'mongodb://localhost/tecnocall'

mongoose.Promise = global.Promise
mongoose.connect(URL, { useCreateIndex: true, useNewUrlParser: true })

module.exports = mongoose.connection