require('./src/config/connect')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const http = require('http').Server(app)
const io = require('socket.io')(http)

let conectedUsers = []

app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(morgan('dev'))

io.on('connection',(socket) => {
  const { codMecanico, numeroTelefone } = socket.handshake.query;

  
  if(codMecanico, numeroTelefone) {
    const celNumFormated = numeroTelefone.replace("(", '')
                                           .replace(")", '')
                                           .replace("-", '')
                                           .replace(" ", '')

    const mecanPhoneKey = `${codMecanico}-${celNumFormated}`

    conectedUsers[mecanPhoneKey] = {
      id: socket.id,
      codMecanico,
      numeroTelefone,
      mecanPhoneKey
    }

    console.log('entrou mais um', conectedUsers)

    socket.join('mecanico')
  }

  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});



app.get('/socket', (req, res) => {
  try {
    req.io.emit('message', 'teste 12345')

    return res.status(200).end()
  } catch (error) {
    console.log('error', error)
    return res.status(500).end()
  }
})

app.set('io', io)
app.set('conectedUsers', conectedUsers)
require('./src')(app)

http.listen(3535, () => {
  console.log('server on')
})
