const express = require('express')
const router = express.Router()

const create = require('./services/create')
const findAll = require('./services/findAll')

const authMid = require('../../middleware/auth')

router.get('/', findAll)
router.post('/', create)

module.exports = router