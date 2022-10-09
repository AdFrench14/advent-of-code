//same as part 1, but eliminate board from both arrays whenever it wins, until the length of boards == 1. then 
const { Console } = require("console");
const fs = require("fs");

let data = (fs.readFileSync(`${__dirname}/input.txt`, "utf-8")).split("\n").filter(line => line);

//Extract the calling numbers and parse into an array
const calledNumbers = data.shift().trim().split(",").map(digit => parseInt(digit));

//Parse the boards into arrays of numbers
data = data.map(line => {
    return line.trim().replace(/\s{2,}/g, " ").split(" ").map(digit => parseInt(digit));
});

//separate the boards into their own arrays
let boards = [];
while (data.length > 0) {
    boards.push(data.splice(0, 5));
}

let lastNumber;
let lastBoard;
const completedBoards = [];

//Use a for loop instead of map so I can break execution when the last board is complete
for (let j = 0; j < calledNumbers.length; j++) {
    const boardsToMarkAsComplete = new Set();
    boards.map((board, index) => {
        //Mark the called numbers!
        board.map(line => {
            markNumber(line, calledNumbers[j]);
        });

        //Make a list of boards that have been completed on this call
        if(checkBoardComplete(board)) {
            boardsToMarkAsComplete.add(index);
        }
    });

    //Move completed boards out of the list to be checked
    boards = boards.filter((board, index) => {
        const complete = Array.from(boardsToMarkAsComplete).includes(index);
        if (complete) {
            completedBoards.push(board);
        }

        return !complete; //keep the boards that aren't complete
    });

    //Stop checking once the last board is complete
    if(boards.length == 0 ) {
        lastNumber = calledNumbers[j]; //save the last number that was called
        lastBoard = completedBoards[completedBoards.length - 1]; //save the last board that was completed
        break; //stop checking boards
    }
};

console.log("Last board: ", lastBoard);
console.log("Last Number: ", lastNumber);

const sumOfLastBoard = lastBoard.flat(Infinity).filter(ele => ele != "called").reduce((accumulator, value) => accumulator + value);

console.log("Sum of Last Board: ", sumOfLastBoard);
console.log("Last Board Score: ", lastNumber * sumOfLastBoard);


////////////////////////////////
// Helper Functions
////////////////////////////////
function markNumber(line, num) {
    const index = line.indexOf(num);
    if (index != -1) {
        line[index] = "called"; //rely on pass by reference
    }
}

function checkBoardComplete(board) {
    let boardComplete = false;
    const numCols = board[0].length;

    board.map(row => {
        if(row.every(cell => cell == "called")) {
            boardComplete = true;
        }
    });

    if(boardComplete) {
        //return early if this board is complete. Don't bother checking columns
        return boardComplete;
    }

    for(let i = 0; i < numCols; i++) {
        const column =[];
        board.map(row => {
            column.push(row[i]);
        });

        if(column.every(cell => cell === "called")) {
            boardComplete = true;
        }
    }

    return boardComplete;
}