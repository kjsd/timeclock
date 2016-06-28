'use strict';

var express = require('express');
var app = express();

// Routing
app.use(express.static(__dirname + '/public'));
app.use('/rest', require('./rest/main'));

var server = app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port %s', server.address().port);
});
