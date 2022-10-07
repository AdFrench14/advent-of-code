//Note: I decided to simplify Part 2 from Part 1 by using for loop instead of map since I find it easier to keep track of multi-dimensional arrays when I can see the indices clearly.
//Transposing the matrix was cool, but not strictly necessary
//I struggled with this one. Misunderstood the algorithm at first - I was counting the most common bit in each position in the original dataset. I should have been counting the most common bit **remaining** in the filtered data set.

let input = require("./input.json");

const data = input.map(binaryString => {
    return binaryString.split("").map(digit => parseInt(digit));
});

let numOfBits = data[0].length; //this only works if all binary numbers have the same number of bits, which is fine in this case
let tempOxyData = [...data]; //Make a copy of the data so we can filter it without losing the original
let tempCO2Data = [...data];

//i is the bit position
for (let i = 0; i < numOfBits; i++) {
    if (tempOxyData.length > 1) {
        const countBit1 = tempOxyData.filter(bin => bin[i] == 1).length; //count the number of "1"s
        const mostCommonBit = (countBit1 >= (tempOxyData.length - countBit1)) ? 1 : 0;

        tempOxyData = tempOxyData.filter(bin => {
            return bin[i] == mostCommonBit;
        });
    }

    if (tempCO2Data.length > 1) {
        const countBit1 = tempCO2Data.filter(bin => bin[i] == 1).length;
        const leastCommonBit = (countBit1 >= (tempCO2Data.length - countBit1)) ? 0 : 1;

        tempCO2Data = tempCO2Data.filter(bin => {
            return bin[i] == leastCommonBit;
        });
    }
}

const oxygenRatingDecimal = parseInt(tempOxyData.flat().join(""), 2);
const co2RatingDecimal = parseInt(tempCO2Data.flat().join(""), 2);

console.log("Oxygen Generator Rating: ", oxygenRatingDecimal);
console.log("CO2 Scrubber Rating: ", co2RatingDecimal);
console.log("Life Support Rating: ", oxygenRatingDecimal * co2RatingDecimal);