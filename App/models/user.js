const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const bcryptHelper = require('../helpers/bcrypt')
const vars = require('../helpers/defaults')

const UserSchema = new Schema({
    firstName: {
        type: String,
        min: 2
    },
    lastName: {
        type: String,
        min: 2
    },
    email: {
        type: String,
        lowercase: true,
        match: [vars.regexEmail],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
       /* match: [vars.regexPassword],*/
        select: false
    },
    role: {
        type: String,
        enum: [vars.ROLE.CUSTOMER
        ],
        required: true,
        default: vars.ROLE.CUSTOMER,
    }
},{
    versionKey: false,
    timestamps: true
})


UserSchema.pre('save', function(next) {
    try {
        let user = this
            // user.avatar = user.gravatar() // disabled

        if (!user.isModified('password')) return next();
        user.password = bcryptHelper.generateHashPassword(user.password)
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.comparePassword = function(candidatePassword, hashPassword, cb) {
    bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
        if (err) {
            debug(err)
            return cb(err)
        }
        cb(null, isMatch)
    })
}


UserSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = mongoose.model('User', UserSchema)