const Phone = require('../../../models/phone')
const Message = require('../../../models/message')

module.exports = async (req, res) => {
  try {
    const messageId = req.params.id
    const { mecanPhoneKey, deletedAt } = req.body
    console.log('messageId', messageId)
    console.log('mecanPhoneKey', mecanPhoneKey)
    console.log('deletedAt', deletedAt)

    const message = await Message.findOneAndUpdate({
      _id: messageId,
      destinatarios: {
        $elemMatch: { mecanPhoneKey, deletedAt: null }
      }},
      {$set: {'destinatarios.$.deletedAt': deletedAt ? deletedAt :Date.now()}
    });
    console.log('message', message)
    return res.status(201).json(message)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}