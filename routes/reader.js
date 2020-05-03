var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

function getBook(bookId) {
    let bookName;
    switch (bookId) {
        case "1":
            bookName = "You Dont Know JS. Part 1 -Up and Going.pdf"
            break;
        case "2":
            bookName = "You Dont Know JS. Part 2 Scope _ Closures.pdf"
            break;
        // case 3:
        //     bookName = ""
        //     break;
        // case 4:
        //     bookName = ""
        //     break;
        // case 5:
        //     bookName = ""
        //     break;
        // case 6:
        //     bookName = ""
        //     break;

    }
    console.log(path.join(process.env.NODE_PATH));
    console.log(path.join(process.env.NODE_PATH, 'ykdjs', bookName));
    //TODO: ykdjs is hardcoding remove it
    let buffer = bookName != "" ? fs.readFileSync(path.join(process.env.NODE_PATH, 'ykdjs', bookName)) : "";

    let book = {
        name: bookName,
        content: buffer
    }

    return book;
}

/* GET ykdjs book. */
router.get('/part/:id', function (req, res, next) {
    res.render('reader', getBook(req.params.id))
});

module.exports = router;
