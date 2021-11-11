const Phone = require('../../../models/phone')

module.exports = async (req, res) => {
  try {
    const phones = await Phone.find()
    return res.status(201).json(phones)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}