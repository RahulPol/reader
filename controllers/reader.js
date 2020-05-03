const path = require('path');
const fs = require('fs');
const PDFParser = require("pdf2json");

exports.getBook = function (req, res, next) {
    let bookId = req.params.id;
    let bookName, bookContent;
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
    let bookFilePath = path.join(process.env.NODE_PATH, 'books/ykdjs', bookName);

    //TODO: ykdjs is hardcoding remove it    
    if (fs.existsSync(bookFilePath)) {
        let pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", errData => {
            console.error(errData.parserError)
            //TODO: create proper interface to raise error
            next(createError(500))
        });
        pdfParser.on("pdfParser_dataReady", pdfData => {
            bookContent = pdfParser.getRawTextContent();
            res.render('reader', {
                name: bookName,
                content: bookContent
            });
        });


        pdfParser.loadPDF(bookFilePath);


    }
}