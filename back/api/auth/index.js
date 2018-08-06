const router = require('express').Router()
const auth = require('../../utils/auth')
const passport = require('passport')
const commonFunc = require('../../utils/commonFunc')
const { User } = require('../../models')
const customError = require('../../utils/error')

require('../../utils/passport').setup()
//가입
router.post('/create', async (req, res, next) => {
  //let saveUserEmail = 0;
  console.log(req.body)
  let user
  try {
    user = await User.create({
      role: 1,
      auth_kind: 'local_' + req.body.email,
      email: req.body.email,
      password: req.body.password,
      nickName: req.body.nickName,
      genre: req.body.genre.join(','),
      purpose: req.body.purpose.join(',')
    })
  } catch (err) {
    return next(err)
  }
  console.log(user)
  res.status(200).json({ user })
})
//로그인
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  let user
  try {
    user = await User.findOne({
      where: { $and: [{ email: email }, { password: password }] }
    })
  } catch (err) {
    return next(err)
  }
  //console.log('!@#!@#!@#', user.dataValues);
  //await db.createAccessLog({ userId: user.id });
  user = {
    role: user.dataValues.role,
    auth_kind: user.dataValues.email,
    email: user.dataValues.email,
    nickName: user.dataValues.nickName
  }
  const accessToken = auth.signToken(user)
  res.json({ accessToken })
})
//faecbook login

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    session: false,
    authType: 'rerequest',
    scope: ['public_profile', 'email']
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('facebookCallback::', req.user)

    const { role, auth_kind, email, username } = req.user
    req.user = {
      role,
      auth_kind,
      email,
      username
    }
    var accessToken = auth.signToken(req.user)
    //console.log(accessToken);
    //res.json({ accessToken });
    //res.cookie('authorization', token, { httpOnly: true });
    if (process.env.NODE_ENV) {
      console.log('aws s3 redirect')
      res.redirect('http://viperbit.xyz')
    } else {
      console.log('local redirect')
      res.redirect(`http://localhost:8080/facebookAuth?accessToken=${accessToken}`)
    }
  }
)

router.get('/home', async (req, res) => {
  let user
  try {
    user = auth.verify(req.headers.authorization)
  } catch (e) {}

  console.log(user)
  user = user ? await db.findUserById(user.id) : null
  const name = user ? user.name : 'World'

  res.json({ greeting: `Hello ${name}` })
})

router.get('/me', auth.ensureAuth(), async (req, res) => {
  const user = await db.findUserById(req.user.id)
  const accessLog = await db.findAccessLog({ userId: user.id })
  res.json({ user, accessLog })
})

function wrapAsync(fn) {
  return function(req, res, next) {
    // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달하세요
    // (이 경우에는 오류 처리기)
    fn(req, res, next).catch(next)
  }
}

module.exports = router
