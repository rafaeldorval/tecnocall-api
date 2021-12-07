const Sector = require('../../../models/sector')

module.exports = async (req, res) => {
  try {
    const sectors = await Sector.find()

    return res.status(201).json(sectors)
  } catch (error) {
    return res.status(500).end()
  }
}