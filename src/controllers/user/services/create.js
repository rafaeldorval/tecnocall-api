const User = require('../../../models/user')

module.exports = async (req, res) => {
  try {
    const userData = req.body

    const checkUser = await User.findOne({ codFenix: userData.codFenix })

    if(checkUser) {
      return res.status(401).json({ msg: 'User already exist' })
    }

    const user = await User.create(userData)

    return res.status(201).json({ userId: user._id })
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}