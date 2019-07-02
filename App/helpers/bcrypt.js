const bcrypt = require('bcrypt')
const config = require('./../../config').get(process.env.NODE_ENV)

const generateHashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(config.bcrypt.salt))
 }

 module.exports =  {
     generateHashPassword
 }