'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// views
app.use(express.static(__dirname + '/public'));

// control APIs are protected with Google OAuth2
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    // tbd.
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }));

app.use('/rest/*',
        passport.authenticate(
          'google',
          { scope: ['https://www.googleapis.com/auth/plus.login'] }
        ), require('./rest/main'));

app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/',
                                          failureRedirect: '/login' }));


var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
