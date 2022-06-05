const prompt = require("prompt");

let grid = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "]
];

function displayPrompt() {

    let numbSeat = { name: "seat", description: "Combien de place voulez vous ? " };
    let numbRow = { name: "row", description: "A quelle rangée voulez vous aller ? " };

    prompt.get([numbSeat, numbRow], function (err, res) {

        // console.log(res);

        if (err) {
            return onErr(err);
        }

        numbSeat = parseInt(res.seat);
        numbRow = parseInt(res.row);

        console.log('Command-line input received:');
        console.log('  number of seats selected: ', numbSeat);
        console.log('  selected row number: ', numbRow);

        let row = grid[numbRow];
        let firstElement = row[0];
        let reserved = grid[numbRow].filter(takeSeat => takeSeat === "X");

        for (let i = 0; i < numbSeat; i++) {
            if (firstElement === " " && numbSeat <= row.length) {
                row[i] = "X";
            } else if (firstElement === "X") {
                for (let j = 0; j < (reserved.length + numbSeat); j++) {
                    if (row[j] === " " && (reserved.length + numbSeat) <= row.length) {
                        row[j] = "X";
                    } else if (row[j] === " " && (reserved.length + numbSeat) > row.length){
                         console.log("No seats available or No more space in the row");
                         break;
                    }
                }
            } else {
                console.log("9 seats maximum allowed");
                break;
            }
        }

        let result = grid[numbRow].filter(freeSeat => freeSeat === " ");

        console.table(grid);
        console.log("seat left", result.length, "in the row", numbRow);
        displayPrompt();

    });
}

displayPrompt();
