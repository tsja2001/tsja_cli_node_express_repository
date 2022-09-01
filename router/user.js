const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()

const validator = require('../middleware/validator/userValidator')

const { verifyToken } = require('../util/jwt')

router
  // 注册
  .post(
    '/registers',
    validator.register,
    userController.register
  )
  // 登陆
  .post('/logins', validator.login, userController.login)
  .get('/lists', verifyToken, userController.list)
  // .get("/lists", userController.list)
  .delete('/', userController.delete)

module.exports = router
