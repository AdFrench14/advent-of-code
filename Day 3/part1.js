let input = require("./input.json");

const matrix = input.map(binaryString => {
    //turn the binary numbers into a matrix of integers
    return binaryString.split("").map(digit => parseInt(digit));
});

//This step isn't strictly necessary since I could just do the calculations without actually transposing the matrix.
//Adrien from the future: transposing the matrix turned out to be a bit of a waste - but I'm not going to refactor since this works anyway
const transposedMatrix = [];

for(let row = 0; row < matrix.length; row++) {

    for(let col = 0; col < matrix[row].length; col++) {
        if (!transposedMatrix[col]) transposedMatrix.push([]); //create an empty array for this column if it doesn't already exist

        transposedMatrix[col].push(matrix[row][col]);
    }
}

const gammaBinary = transposedMatrix.map(row => {
    //We can calculate the most common value by taking the average and rounding.
    //If the average is >0.5, then 1 must be more common than 0.
    //If the average is <0.5, then 0 must be more common than 1.
    const rowSum = row.reduce((prev, curr) => {
       return prev + curr; 
    });
    return Math.round(rowSum/row.length);
})

//Invert the gamma to get epsilon
const epsilonBinary = gammaBinary.map(digit => {
    return digit === 1 ? 0 : 1;
});

const gammaDecimal = parseInt(gammaBinary.join(""), 2); //base 2
const epsilonDecimal = parseInt(epsilonBinary.join(""), 2); //base 2

console.log("Gamma Rate: ", gammaDecimal);
console.log("Epsilon Rate: ", epsilonDecimal);
console.log("Gamma * Epsilon = ", gammaDecimal * epsilonDecimal);