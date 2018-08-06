const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//facebook add
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');
const envConfig = require('../config/environment');
const CLIENT_ID = process.env.FB_CLIENTID || envConfig.facebook.clientID;
const CLIENT_SECRET =
  process.env.FB_CLIENT_SECRET || envConfig.facebook.clientSecret;
exports.setup = function() {
  //console.log('setup')
  passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => {
    console.log('derialize');
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['email', 'name', 'displayName'],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        console.log('strateg!@#!@#!@#!@#!@#!@#');
        //console.log('req::', req);
        console.log('accessToken::', accessToken);
        console.log('refreshToken::', refreshToken);
        console.log('profile::', profile);

        User.findOne({
          where: { auth_kind: 'facebook_' + profile.id }
        })
          .then(results => {
            if (!results) {
              return User.create({
                auth_kind: 'facebook_' + profile.id,
                email: profile.emails[0].value,
                nickName: profile.displayName
                //username: profile.displayName
              });
            }
            return results;
          })
          .then(results => {
            return done(null, results.dataValues);
          });
      }
    )
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        // 인증 정보 체크 로직
        User.findOne({
          where: { $and: [{ email: email }, { password: password }] }
        }).then(results => {
          if (!results) {
            return done(null, false, { message: 'Fail to login.' });
          }
          return done(null, results.dataValues);
        });
      }
    )
  );
};

//로그인라우트백업
// router.post('/login', async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log(email, password);

//   passport.authenticate('local', function(err, user, info) {
//     var error = err || info;
//     console.log('error~:', error);
//     if (error) return next(new customError('genreError')); //return res.json(401, error);
//     if (!user)
//       return res.status(404).json({
//         message: 'Something went wrong, please try again.'
//       });
//     // 인증된 유저 정보로 응답
//     console.log('Localuser:', user);
//     const { /*auth_id,*/ email, nickName } = user;
//     user = {
//       //auth_id,
//       email,

//       nickName
//     };
//     var accessToken = auth.signToken(user);
//     //res.cookie('authorization', token, { httpOnly: true });
//     res.status(200).json({ accessToken });
//     //console.log(req.header);
//   })(req, res, next);
// });
