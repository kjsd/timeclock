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
var compression = require('compression');
var minify = require('express-minify');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require('models/User');

app.use(compression());
app.use(minify());

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
app.use('/res', require('controllers/main'));


// control APIs are protected with Google OAuth2
if (process.env.NODE_ENV != 'production') {
  process.env.BASE_URL = 'http://localhost:3000';
  process.env.GOOGLE_CLIENT_ID =
    '297000402789-nubthf0guot6kfa1696qq7i82mi5494g.apps.googleusercontent.com';
  process.env.GOOGLE_CLIENT_SECRET = 'LQqYLbHbCDN-sxuyqYzRz3_J';
}

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/token/callback'
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if (err) return done(err);

        user.name = profile.displayName;
        user.googleAccessToken = accessToken;
        user.save();
        return done(null, accessToken);
      });
    });
  }));

app.get('/token',
        passport.authenticate(
          'google', {
            session: false,
            scope: ['https://www.googleapis.com/auth/plus.login']
          }
        ));

app.get('/token/callback', function (req, res, next) {
  passport.authenticate('google', function (err, accessToken) {
    console.log(accessToken);
    res.render('token.ejs', { token: accessToken });
  })(req, res, next);
});

var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
