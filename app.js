/**
 * @file app.js
 *
 * @version $Id:$
 *
 * @brief
 *
 * @author Kenji MINOURA / kenji@kandj.org
 *
 * Copyright (c) 2016 K&J Software Design, Corp. All rights reserved.
 *
 * @see <related_items>
 ***********************************************************************/
'use strict';

require('app-module-path').addPath(__dirname + '/modules');

var express = require('express');
var app = express();
var device = require('express-device');
var bodyParser = require('body-parser');
//var compression = require('compression');
//var minify = require('express-minify');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//app.use(compression());
//app.use(minify());

// views
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');
app.locals.layout = false;
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(device.capture());

device.enableDeviceHelpers(app);

app.get('/', function(req, res) {
  res.render('index.ejs');
});

// controllers
// tbd. 
app.use('/res', require('main'));

/* tbd.
// control APIs are protected with Google OAuth2
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/google/callback'
  }, function(accessToken, refreshToken, profile, done) {
    // tbd.
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    // return done(err, user);
    // });
  }));

app.use('/res/*',
        passport.authenticate(
          'google',
          { scope: ['https://www.googleapis.com/auth/plus.login'] }
        ), require('main'));

app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/',
                                          failureRedirect: '/login' }));
*/

var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
