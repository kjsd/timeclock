var express = require('express');
var router = express.Router();

router.get('/true', function(req, res) {
  res.sendStatus(200);
});
router.get('/false', function(req, res) {
  res.sendStatus(401);
});
router.get('/now', function(req, res) {
  res.send(new Date().toISOString());
});

router.use('/users', require('users'));


module.exports = router;
