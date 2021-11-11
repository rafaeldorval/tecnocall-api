const Phone = require('../../../models/phone')
const Message = require('../../../models/message')

module.exports = async (req, res) => {
  try {
    const messageId = req.params.id
    const { mecanPhoneKey, readAt } = req.body
    console.log('messageId', messageId)
    console.log('mecanPhoneKey', mecanPhoneKey)
    console.log('readAt', readAt)

    // if(forAll) {
    //   const findPhone = await Phone.findOne({ mecanPhoneKey })

    //   const message = await Message.findOneAndUpdate({
    //     _id: messageId,
    //     forAll: true,
    //     $or: [{
    //       destinatarios: {
    //         $elemMatch: { mecanPhoneKey: { $ne: mecanPhoneKey  } }
    //       },
    //     }, {
    //       destinatarios: []
    //     }]
    //   },
    //   {
    //       $push: {
    //         destinatarios: {
    //           phoneId: findPhone._id,
    //           mecanPhoneKey: findPhone.mecanPhoneKey,
    //           readAt: Date.now()
    //         }
    //       }
    //     });

    //   return res.status(201).json(message)
    // }

    const message = await Message.findOneAndUpdate({
      _id: messageId,
      destinatarios: {
        $elemMatch: { mecanPhoneKey, readAt: null }
      }},
      {$set: {'destinatarios.$.readAt': readAt ? readAt :Date.now()}
    });
    console.log('message', message)
    return res.status(201).json(message)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}