var express = require('express');
var router = express.Router();
const readerController = require('../controllers/reader')

/* GET ykdjs book. */
router.get('/part/:id', readerController.getBook)

module.exports = router;
