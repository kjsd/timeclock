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
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var refresh = require('passport-oauth2-refresh');
var User = require('models/User');


if (process.env.NODE_ENV == 'production') {
  app.use(require('compression')());
  app.use(require('express-minify')());
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
app.get('/bye', function(req, res) {
  res.render('bye.ejs');
});

// Authentication controllers
var strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.BASE_URL + '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      if (err) return done(err);

      var now = new Date();
      user.name = profile.displayName;
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.lastLogin = now.toISOString();
      user.lastAccess = now.toISOString();
      user.save();
      
      return done(null, user);
    });
  });
});

passport.use(strategy);
refresh.use(strategy);

app.get('/auth/google', passport.authenticate('google', {
  session: false,
  scope: ['https://www.googleapis.com/auth/plus.login'],
  accessType: 'offline',
  approvalPrompt: 'force'
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: "/bye"
}), function(req, res) {
  res.render('token.ejs', { token_: req.user.accessToken });
});

// Resource controllers and Token Authentication
passport.use(new BearerStrategy(function(token, done) {
  User.findOne({ accessToken: token }, function(err, user) {
    if (err)  return done(err);
    if (!user) { return done(null, false); }

    return done(null, user, { scope: 'all' });
  });
}));

app.get('/token', passport.authenticate('bearer', {
  session: false
}), function(req, res) {
  var now = new Date();
  if (now.getTime() - Date.parse(req.user.lastLogin) > 864000000) {
    // return 401 when 10days no login
    res.sendStatus(401);
    return;
  }

  refresh.requestNewAccessToken(
    'google', req.user.refreshToken,
    function(err, accessToken, refreshToken) {
      if (err) {
        res.sendStatus(401);
        return;
      }
      req.user.accessToken = accessToken;
      req.user.lastAccess = new Date().toISOString();
      req.user.save();

      res.json({ token: accessToken });
    }
  );
});

app.use('/res', passport.authenticate('bearer', {
  session: false
}), function(req, res, next) {
  var now = new Date();
  if (now.getTime() - Date.parse(req.user.lastAccess) > 600000) {
    // return 401 when 10min no access
    res.sendStatus(401);
    return;
  }

  req.user.lastAccess = now.toISOString();
  req.user.save();

  next();
}, require('controllers/main'));


var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
