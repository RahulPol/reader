const path = require('path');
const fs = require('fs');
const PDFParser = require("pdf2json");

exports.getBook = function (req, res, next) {
    let bookId = req.params.id;
    let bookName, bookContent;
    switch (bookId) {
        case "1":
            bookName = "Chapter 1_ Into Programming.pdf"
            break;
        case "2":
            bookName = "You Dont Know JS. Part 2 Scope _ Closures.pdf"
            break;
    }
    //TODO: ykdjs is hardcoding remove it    
    let bookFilePath = path.join(process.env.NODE_PATH, 'books/ykdjs', bookName);


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


    }
}