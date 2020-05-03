var express = require('express');
var router = express.Router();
const booksController = require('../controllers/booksCtrl');

/* GET ykdjs book. */
router.get('/:bookname', booksController.getBook);

module.exports = router;