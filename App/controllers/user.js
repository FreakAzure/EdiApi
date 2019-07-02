const User = require("../models/user");
const stringResponse = require("../helpers/strings");
const Joi = require("joi");
const authJWT = require("../helpers/jwt");
const vars = require("../helpers/defaults");
const helper = require("../helpers/userhelper");
//const userRep = require("../repository/user");
const config = require("../../config").get(process.env.NODE_ENV);

async function logIn(req, res) {
    try {
        if (req.body.password && req.body.email) {
            User.findOne({
                    email: req.body.email
                })
                .select("_id role account password verified")
                .exec((err, user) => {
                    if (err || !user) {
                        return res.status(401).send(stringResponse.error.errorPassEmail);
                    }

                     if (user) {
                        user.comparePassword(req.body.password, user.password, function(err, isMatch) {

                            if (isMatch) {

                                user.save(function(err) {
                                    if (err) {
                                        console.log('error')
                                    }
                                    let dataToken = authJWT.createToken(user);
                                    return res.status(200).send({
                                        verified: user.verified,
                                        access_token: dataToken[0],
                                        refresh_token: authJWT.createRefreshToken(user),
                                        expires_in: dataToken[1],
                                        role: user.role
                                    });
                                });

                            } else {

                                return res.status(401).send({
                                    error: stringResponse.error.errorPassEmail
                                });

                            }
                        });
                    } else {
                        return res.status(401).send({
                            error: stringResponse.error.errorPassEmail
                        });
                    }
                });
        } else {
            return res.status(401).send({
                error: stringResponse.error.errorPassEmail
            });
        }
    } catch (err) {
        return res.status(500).send({
            error: stringResponse.error.errorUnknown
        });
    }
}

/**
 * Signup users
 *
 * In this function only can be signed students users
 * If role is student, account will verified by default
 */
function signUp(req, res) {
    try {
        // Rules
        const userRules = Joi.object().keys({
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            password: Joi.string().required(),
            verified: true
        });

        // Validation
        const result = Joi.validate({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            },
            userRules
        );

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            verified: true
        });


        // Save new user
        user.save(function(err) {
            if (err) {
                if (err.code === 11000) {
                    return res.status(409).send(err);
                } else {
                    return res.status(400).send(err);
                }
            }

            let dataToken = authJWT.createToken(user);
            let userResponse = {
                verified: user.verified,
                access_token: dataToken[0],
                refresh_token: authJWT.createRefreshToken(user),
                expires_in: dataToken[1],
                role: user.role
            };

            return res.status(200).send(userResponse);
        });

    } catch (err) {
        return res.status(500).send(stringResponse.error.errorUnknown);
    }
}



function getUserData(req, res) {

    var id = ""

    if (req.params.userid) {
        id = req.params.userid;
    } else {
        id = req.user._id;
    }

    User.findOne({ _id: id })
        .select("-fcmTokens -account")
        .lean()
        .exec(function(err, data) {
            if (err) {
                return res.status(500).send(stringResponse.error.errorUnknown);
            }

            res.status(200).send(data)
        })
}



module.exports = {
    signUp,
    getUserData,
    logIn
};