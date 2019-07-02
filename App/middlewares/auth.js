const dotenv = require('dotenv').config(process.env.NODE_ENV)
const config = require('../../config').get(process.env.NODE_ENV)
const pass_role = require('passport')
const pass_all = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const {
  ExtractJwt
} = require('passport-jwt')
const User = require('../models/user')
const vars = require('../helpers/defaults')


/** 
 * Admin
 * Access for this roles: admin
 */
pass_role.use('customer', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_TOKEN,
}, async (payload, done) => {
  try {
    const user = await User.findOne({
      _id: payload.id,
      role: vars.ROLE.CUSTOMER
    })

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

const authCustomer = pass_role.authenticate('customer', {
  session: false,
})

/** 
 * All Users
 * Access for this roles: admin, manager, customer
 */
pass_all.use('all', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_TOKEN,
}, async (payload, done) => {
  try {
    const user = await User.findOne({
      _id: payload.id,
    })

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

const authAll = pass_all.authenticate('all', {
  session: false,
})


module.exports = {
  authAll,
    authCustomer,
}
