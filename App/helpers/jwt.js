const JWT = require('jsonwebtoken')
const moment = require('moment')
const config = require('../../config').get(process.env.NODE_ENV)

function createToken(user) {
  let exp_token = moment().add(7, 'days').unix() // current time + 7 day ahead
  return [
    JWT.sign({
      id: user.id,
      sub: user._id,
      role: user.role, // user role
      iat: moment().unix(), // current time
      exp: exp_token,
    }, config.SECRET_TOKEN),
    exp_token
  ]
}

function createRefreshToken(user) {
  return JWT.sign({
    id: user.id,
    sub: user._id,
    role: user.role, // user role
    iat: moment().unix(), // current time
    exp: moment().add(15, 'days').unix(), // current time + 15 days ahead
  }, config.SECRET_REFRESH_TOKEN)
}

function createNoExpiryToken(user){
    return [
        JWT.sign({
            id: user.id,
            sub: user._id,
            role: user.role, // user role
        }, config.SECRET_TOKEN)
    ]
}

module.exports = {
  createToken,
  createRefreshToken,
  createNoExpiryToken
}
