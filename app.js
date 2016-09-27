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
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('models/User');


if (process.env.NODE_ENV == 'production') {
  app.use(compression());
  app.use(minify());
} else {
  process.env.BASE_URL = 'http://localhost:3000';
  process.env.GOOGLE_CLIENT_ID =
    '297000402789-nubthf0guot6kfa1696qq7i82mi5494g.apps.googleusercontent.com';
  process.env.GOOGLE_CLIENT_SECRET = 'LQqYLbHbCDN-sxuyqYzRz3_J';
}

// Views
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
app.get('/empty', function(req, res) {
  res.render('empty.ejs');
});

// Authentication controllers
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.BASE_URL + '/token/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      if (err) return done(err);

      user.name = profile.displayName;
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.save();
      
      return done(null, user);
    });
  });
}));

app.get('/token', passport.authenticate('google', {
  session: false,
  scope: ['https://www.googleapis.com/auth/plus.login'],
  accessType: 'offline',
  approvalPrompt: 'force'
}));

app.get('/token/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: "/empty"
}), function(req, res) {
  res.render('token.ejs', { token: req.user.accessToken });
});

// Resource controllers and Token Authentication
passport.use(new BearerStrategy(function(token, done) {
  User.findOne({ accessToken: token }, function(err, user) {
    if (err)  return done(err);

    return done(null, user, { scope: 'all' });
  });
}));

app.use('/res', passport.authenticate('bearer', { session: false }),
        require('controllers/main'));


var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
