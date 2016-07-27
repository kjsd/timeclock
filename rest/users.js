var express = require('express');
var router = express.Router();

var users_model = require('./model/users');

router.get('/', function(req, res) {
    var data = users_model.query(0);

    if (!data || !'length' in data) {
        res.sendStatus(404);
        return;
    }

    res.send(data);
});

router.get('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var data = users_model.get(id);

    if (!data) {
        res.sendStatus(404);
        return;
    }

    res.send(data);
});


module.exports = router;
