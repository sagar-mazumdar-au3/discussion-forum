var express = require('express');
var router = express.Router();

/* GET server heath-check. */
router.get('/', function(req, res, next) {
  res.status(200).send('server is live.');
});

module.exports = router;
