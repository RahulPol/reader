const path = require('path');
const fs = require('fs');
const PDFParser = require("pdf2json");

exports.getBook = function (req, res, next) {
    let bookName = req.params.bookname;
    console.log(req.params)
    let bookContent;

    let bookFilePath = path.join(process.env.NODE_PATH, 'books/', unescape(bookName));


    if (fs.existsSync(bookFilePath)) {
        let pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", errData => {
            console.error(errData.parserError)
            //TODO: create proper interface to raise error
            next(createError(500))
        });
        pdfParser.on("pdfParser_dataReady", pdfData => {
            bookContent =
                // bookContent = JSON.stringify(pdfData);
                res.send({
                    name: bookName,
                    rawContent: pdfParser.getRawTextContent(),
                    jsonContent: JSON.stringify(pdfData)
                });
        });
        pdfParser.loadPDF(bookFilePath);
    } else {
        res.send(createError(404))
    }
}

exports.getB = (req, res, next) => {
    console.log(req.params.bookName)
    res.send("hello");
}