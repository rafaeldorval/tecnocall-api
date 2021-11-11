const express = require('express')
const router = express.Router()

const create = require('./services/create')
const findAll = require('./services/findAll')

const authMid = require('../../middleware/auth')

router.get('/', authMid, findAll)
router.post('/', authMid, create)

module.exports = router