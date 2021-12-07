const Sector = require('../../../models/sector')

module.exports = async (req, res) => {
  try {
    const { name } = req.body

    await Sector.create({ name })

    return res.status(201).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}