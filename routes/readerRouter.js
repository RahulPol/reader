var express = require('express');
var router = express.Router();
var compression = require('compression');

router.get('/', compression(), (req, res, next) => {
    res.sendFile('client/reader.html', { root: process.env.NODE_PATH })
});

module.exports = router;