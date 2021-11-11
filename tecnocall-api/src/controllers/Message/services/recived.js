const Phone = require('../../../models/phone')
const Message = require('../../../models/message')
module.exports = async (req, res) => {
  try {
    const messageId = req.params.id
    const { mecanPhoneKey, forAll } = req.body

    if(forAll) {
      const findPhone = await Phone.findOne({ mecanPhoneKey })

      const message = await Message.findOneAndUpdate({
        _id: messageId,
        forAll: true,
        $or: [{
          destinatarios: {
            $elemMatch: { mecanPhoneKey: { $ne: mecanPhoneKey  } }
          },
        }, {
          destinatarios: []
        }]
      },
      {
          $push: {
            destinatarios: {
              phoneId: findPhone._id,
              mecanPhoneKey: findPhone.mecanPhoneKey,
              recivedAt: Date.now()
            }
          }
        });
      return res.status(201).json(message)
    }

    const message = await Message.findOneAndUpdate({
      _id: messageId,
      forAll: false,
      destinatarios: {
        $elemMatch: { mecanPhoneKey, recivedAt: null }
      }},
      {$set: {'destinatarios.$.recivedAt': Date.now()}
    });
    return res.status(201).json(message)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}