// 引入数据库集合
const { User } = require('../model')
const { createToken } = require('../util/jwt')
// 注册
exports.register = async (req, res, next) => {
  const userModel = new User(req.body)

  const dbBack = await userModel.save()

  const user = dbBack.toJSON()
  delete user.password
  res.status(201).json({ user })
}

// 登陆
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  let dbBack = await User.findOne({ email })
  if (!dbBack) {
    res.status(402).json({ error: '邮箱或密码错误' })
  }

  dbBack = dbBack.toJSON()
  // 用dbBack生成token, 并放在dbBack上
  dbBack.token = await createToken(dbBack)

  res.status(200).json({ dbBack })
}

exports.list = async (req, res, next) => {
  console.log(req.method)
  try {
    res.json('/user-list')
  } catch (e) {
    console.log(e)
  }
}

exports.delete = async (req, res, next) => {
  console.log(req.method)
  res.send('/user-list')
}
