var express = require('express');
var router = express.Router();

router.get('/true', function(req, res) {
  res.sendStatus(200);
});
router.get('/false', function(req, res) {
  res.sendStatus(401);
});

// tbd. stub
router.get('/me', function(req, res) {
  res.send({
    id: 'sample1',
    name: 'Sample User',
    iconClass: 'tcUserThiefIcon'
  });
});


module.exports = router;
