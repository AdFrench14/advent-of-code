const fs = require("fs");

let data = (fs.readFileSync(`${__dirname}/input.txt`, "utf-8")).split("\n").filter(line => line);

//Extract the calling numbers and parse into an array
const calledNumbers = data.shift().trim().split(",").map(digit => parseInt(digit));

//Parse the boards into arrays of numbers
data = data.map(line => {
    return line.trim().replace(/\s{2,}/g, " ").split(" ").map(digit => parseInt(digit));
});

//separate the boards into their own arrays
const boards = [];
while (data.length > 0) {
    boards.push(data.splice(0, 5));
}

//Adrien from the future: much like Day 3 Part 1, actually transposing the matrix was wasted effort. I improved my approach in part 2 i think.
const transposedBoards = [];

boards.map(board => {
    const transposedBoard = [];

    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[row].length; col++) {
            if (!transposedBoard[col]) transposedBoard.push([]); //create an empty array for this column if it doesn't already exist

            transposedBoard[col].push(board[row][col]);
        }
    }

    transposedBoards.push(transposedBoard);
});

let completeBoardIndex;
let winningNumber;
let winningIndex;

calledNumbers.map((calledNum, calledIndex) => {
    if (!completeBoardIndex) {
        //Check the horizontal lines
        boards.map((board, boardIndex) => {
            if (!completeBoardIndex) { //don't move to next board if one is already complete
                board.map(line => {
                    const index = line.indexOf(calledNum);
                    if (index != -1) {
                        line[index] = "called";
                    }

                    if (line.every(cell => cell == "called")) {
                        completeBoardIndex = boardIndex;
                        winningNumber = calledNum;
                        winningIndex = calledIndex;
                    }
                })
            }
        });

        //Check the vertical lines
        transposedBoards.map((board, boardIndex) => {
            if (!completeBoardIndex) { //don't move to next board if one is already complete
                board.map(line => {
                    const index = line.indexOf(calledNum);
                    if (index != -1) {
                        line[index] = "called";
                    }

                    if (line.every(cell => cell == "called")) {
                        completeBoardIndex = boardIndex;
                        winningNumber = calledNum;
                        winningIndex = calledIndex;
                    }
                })
            }
        })
    }
});

const sumOfWinningBoard = boards[completeBoardIndex].flat().filter(ele => ele != "called").reduce((accumulator, value) => accumulator + value);

console.log("Winning board: ", boards[completeBoardIndex]);
console.log("Winning Num: ", winningNumber);
console.log("Index Winning Num: ", winningIndex);
console.log("Sum of Winning Board: ", sumOfWinningBoard);
console.log("Winning Score: ", winningNumber * sumOfWinningBoard);