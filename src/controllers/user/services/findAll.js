const Loja = require('../../../models/loja')

module.exports = async (req, res) => {
  try {
    const lojas = await Loja.find()

    return res.status(201).json(lojas)
  } catch (error) {
    return res.status(500).end()
  }
}