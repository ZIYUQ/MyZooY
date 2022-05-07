// using emailAddress and password
const LocalStrategy = require('passport-local').Strategy
// our user model
const User = require('../models/user')
// our admin model
const Moderator = require('../models/moderator')
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Mail = require('../middleware/mail')
const codeGenerate = require('../util/randomCode')

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
        User.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => {
        console.log(jwt_payload)
        // passport will but the decrypted token in jwt_payload variable
        User.findOne({ '_id': jwt_payload.body._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            // if we found user, provide the user instance to passport
            if (user) {
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'emailAddress',
        passwordField: 'password',
    },
        function (emailAddress, password, done) {
            process.nextTick(function () {
                // see if the user with the emailAddress exists
                User.findOne({ 'emailAddress': emailAddress }, function (err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    } else if (!user || !user.active) {

                        return done(null, false, { message: 'Email Address not registered' });
                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, { message: 'Password incorrect' });
                    }
                    else if (user.ban) {
                        return done(null, false, { message: 'This account is rejected.' });
                    }
                    else {
                        return done(null, user);
                    }
                });
            })

        }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'emailAddress',     // get emailAddress and password
        passwordField: 'password',
        passReqToCallback: true    // pass req variables
    }, function (req, emailAddress, password, done) {
        process.nextTick(function () {
            User.findOne({ 'emailAddress': emailAddress }, function (err, existingUser) {
                // search a user by the emailAddress
                // authentication failure
                if (err) {
                    console.log(err)
                    return done(err, false, { message: "Database query failed" });
                } else {
                    // If the emailAddress has already been used, send message and return false
                    if (existingUser && existingUser.active) {
                        console.log("Customer signup failed:", emailAddress, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Email Address has already Registered" });
                    }
                    // If the information is not entered, will return with the wrong message

                    else {
                        let code = codeGenerate.getRandomNumber().toString()
                        console.log(code)
                        Mail.send(emailAddress, req.body.userName, code)
                            .then(() => {
                            }).catch(() => {
                                console.log(1)
                            })
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.userName = req.body.userName
                        newUser.emailAddress = emailAddress;
                        newUser.password = newUser.generateHash(password);
                        newUser.ban = false;
                        newUser.active = false;
                        newUser.code = newUser.generateHash(code);
                        // and save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                }
            })
        })
    }))
}