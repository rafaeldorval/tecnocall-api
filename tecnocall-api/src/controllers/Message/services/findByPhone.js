const Message = require('../../../models/message')
module.exports = async (req, res) => {
  try {
    const mecanPhoneKey = req.params.id
    const message = await Message.find({
      $or: [
        { destinatarios: {
          $elemMatch: { mecanPhoneKey, deletedAt: null }
        }},
        {
          forAll: true,
          destinatarios: { $size: 0 }
        }
      ],
    }).sort({ createdAt: 'DESC' })

    return res.status(201).json(message)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}