var config = {
    default: {
        host: process.env.HOST,
        port: process.env.PORT,
        db: process.env.MONGODB_URI,
        bcrypt: {
            salt: 10
        },
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
        SECRET_EMAIL_VERIFICATION_TOKEN: process.env.SECRET_EMAIL_VERIFICATION_TOKEN,
        SECRET_RESET_PASSWORD_TOKEN: process.env.SECRET_RESET_PASSWORD_TOKEN,
        SECRET_EVENT_TOKEN: process.env.SECRET_EMAIL_VERIFICATION_TOKEN
    },
    production: {
        host: process.env.HOST,
        port: process.env.PORT,
        db: process.env.MONGODB_URI,
        bcrypt: {
            salt: 10
        },
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
        SECRET_EMAIL_VERIFICATION_TOKEN: process.env.SECRET_EMAIL_VERIFICATION_TOKEN,
        SECRET_RESET_PASSWORD_TOKEN: process.env.SECRET_RESET_PASSWORD_TOKEN,
        SECRET_EVENT_TOKEN: process.env.SECRET_EMAIL_VERIFICATION_TOKEN,
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}