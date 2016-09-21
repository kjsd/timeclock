var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// tbd. stub
var user_ = {
  id: 'sample1',
  name: 'Sample User',
  breakTime: 3600,
  iconClass: 'tcUserThiefIcon'
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/me', function(req, res) {
  res.json(user_);
});

router.put('/me', function(req, res) {
  Object.keys(user_).forEach(function(k) {
    if (k == 'id') return;
    if (!req.body.hasOwnProperty(k)) return;

    user_[k] = req.body[k];
  });
  res.json(user_);
});

router.delete('/me', function(req, res) {
  res.sendStatus(403);
});

module.exports = router;
