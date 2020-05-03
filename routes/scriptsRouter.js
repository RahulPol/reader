var express = require('express');
var router = express.Router();
var compression = require('compression');


router.get('/reader.js', compression(), (req, res, next) => {
    res.sendFile('scripts/reader.js', { root: process.env.NODE_PATH })
});

module.exports = router;