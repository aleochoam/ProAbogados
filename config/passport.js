var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/userModel');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
        console.log("ESTOY POR ACA")
        process.nextTick(function() {

        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                console.log(err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                var newUser      = new User();
                
                newUser.username = username;
                newUserpassword  = password;

                newUser.save(function(err, document) {
                    if (err)
                        throw err;
                    console.log(document)
                    return done(null, newUser);
                });
            }

        });

        });

    }));

};