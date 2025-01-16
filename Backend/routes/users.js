var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   return pgClient.query('SELECT * FROM users');

});

module.exports = router;
