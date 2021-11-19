const Loja = require('../../../models/loja')

module.exports = async (req, res) => {
  try {
    const {cod, name} = req.body

    await Loja.create({ cod, name })

    return res.status(201).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}