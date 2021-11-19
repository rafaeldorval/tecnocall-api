const loja = require('./controllers/loja')

module.exports = app => {
  app.use('/loja', loja)
}