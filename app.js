'use strict';

var express = require('express');
var app = express();

// views
app.use(express.static(__dirname + '/public'));

// controls
app.use('/rest', require('./rest/main'));


var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
