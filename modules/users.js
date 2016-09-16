var express = require('express');
var router = express.Router();

// tbd. stub
router.get('/me', function(req, res) {
  res.send({
    id: 'sample1',
    name: 'Sample User',
    breakTime: 7200,
    iconClass: 'tcUserThiefIcon'
  });
});


module.exports = router;
