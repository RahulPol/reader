$(document).ready(() => {
    const minute = 60 * 1000;

    let bookName, bookContent;

    let wordsPerMinute = document.getElementById("wpm").value;
    let stopFlag = true;
    let speed = minute / wordsPerMinute;
    let tokens = [];
    let index = 0;
    let space = " ";

    let sleep = (ms) => {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    let addAsthetics = (token) => {
        let middleIndex = Math.floor(token.length / 2);
        return "> " + token.substring(0, middleIndex) + '<span class="red">' + token.charAt(middleIndex) + '</span>' + token.substring(middleIndex + 1) + " <"
    }

    let addToPrev = (token) => {
        let blob = token + space;
        $("#prev").append(blob);
    }

    let updateCompletePercentage = () => {
        let completPercentage = (index / tokens.length * 100).toFixed(1) + "% complete";
        $("#completPercentage").html(completPercentage);
    }

    let iterateToken = async () => {
        while (!stopFlag && index < tokens.length) {
            let token = tokens[index];
            $("#current").html(addAsthetics(token));
            addToPrev(token);
            updateCompletePercentage();
            await sleep(speed);
            index++;
        }
    }

    let validateToken = (token) => {
        let regexp1 = /^-+/;
        let regexp2 = /-+$/;
        return token.length > 0 && !regexp1.test(token) && !regexp2.test(token);
    }

    let getTokens = (content) => {
        var tokens = content.match(/\S+/g);
        tokens = tokens.filter(validateToken)
        return tokens;
    }

    let initPage = (data) => {
        bookName = data.name;
        bookContent = data.rawContent;
        console.log(JSON.parse(data.jsonContent));
        $("#title").html(bookName);
        tokens = getTokens(bookContent);
        console.log(tokens);
        console.log(wordsPerMinute);
        iterateToken();
    }

    $('#wpm').change(() => {
        speed = minute / document.getElementById("wpm").value;
    })

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            stopFlag = !stopFlag;
            iterateToken();
            if (stopFlag) {
                $(document.getElementById("prev")).css({ opacity: 1 })
            } else {
                $(document.getElementById("prev")).css({ opacity: 0.3 })
            }
        }
    }


    // Chapter 1 IntoProgramming.pdf
    // Hide and Seek.pdf
    $.ajax({
        url: "http://localhost:3000/book/asynchronous%20javascript.pdf", success: function (result) {
            initPage(result);
            $(document.getElementById("footer")).css({ display: "block" })
        }
    });
});