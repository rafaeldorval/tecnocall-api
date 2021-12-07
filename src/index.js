const loja = require('./controllers/loja')
const sector = require('./controllers/sector')
const user = require('./controllers/user')

module.exports = app => {
  app.use('/loja', loja)
  app.use('/sector', sector)
  app.use('/user', user)
}