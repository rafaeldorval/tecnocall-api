const express = require('express')
const router = express.Router()

const create = require('./services/create')
const recived = require('./services/recived')
const read = require('./services/read')
const deleted = require('./services/deleted')
const findByPhone = require('./services/findByPhone')

const authMid = require('../../middleware/auth')

router.post('/', authMid, create)
router.get('/byPhone/:id', authMid, findByPhone)
router.put('/recived/:id', authMid, recived)
router.put('/read/:id', authMid, read)
router.put('/deleted/:id', authMid, deleted)

module.exports = router