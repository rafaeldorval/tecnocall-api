const phone = require('./controllers/Phone')
const location = require('./controllers/Location')
const travel = require('./controllers/Travel')
const recordTravel = require('./controllers/RecordTravel')
const track = require('./controllers/Track')
const message = require('./controllers/Message')

module.exports = app => {
  app.use('/phone', phone)
  app.use('/location', location)
  app.use('/travel', travel)
  app.use('/record-travel', recordTravel)
  app.use('/track', track)
  app.use('/message', message)
}