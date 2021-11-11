const Phone = require('../../../models/phone')
const Message = require('../../../models/message')

async function findPhone(destinatarios) {
  console.log('destinatarios', destinatarios)
  const destinSplit = destinatarios.split(',')

  let phones = []

  for (const destin of destinSplit) {
    const phone = await Phone.findOne({ $or: [
      { codMecanico: destin },
      { numeroTelefone: destin },
    ]})

    if(phone) {
      const returnPhoneData = {
        phoneId: phone._id,
        mecanPhoneKey: phone.mecanPhoneKey,
      }
      
      phones.push(returnPhoneData)
    }
  }

  return phones
}

module.exports = async (req, res) => {
  try {
    const io = req.app.get('io')
    const conectedUsers = req.app.get('conectedUsers')
    console.log('req.conectedUsers', req.conectedUsers)
    console.log('conectedUsers', conectedUsers)
    const {destinatarios, ...bodyData} = req.body

    if(destinatarios === "all") {
      const createMessage = {
        ...bodyData,
        forAll: true
      }
  
      const message = await Message.create(createMessage)

      io.emit('message', message)
      console.log('all')
      return res.status(201).json({ msg: 'Message sent successfully' })
    }

    const findPhones = await findPhone(destinatarios)

    if(!findPhones) {
      return res.status(404).json({ msg: 'not a destinatário found' })
    }

    const createMessage = {
      destinatarios: findPhones,
      ...bodyData
    }

    const message = await Message.create(createMessage)

    findPhones.map(phone => {
      const connectedPhone = conectedUsers[phone.mecanPhoneKey]

      if(connectedPhone) {
        io.to(connectedPhone.id).emit('message', message);
      }
    })

    return res.status(201).json({ msg: 'Message sent successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}