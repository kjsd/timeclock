var express = require('express');
var router = express.Router();
var auth = require('basic-auth-connect');

router.all('/*', auth(function(user, passwd) {
    return (user == 'test') && (passwd == 'test3');
}));

router.get('/true', function(req, res) {
    res.sendStatus(200);
});
router.get('/false', function(req, res) {
    res.sendStatus(401);
});

router.use('/users', require('./users'));


module.exports = router;
