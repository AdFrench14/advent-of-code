let input = require("./input.json");

//Use filter with a predicate function to check if each element is greater than the previous
//if not, it is removed from the array.
//use the length property to the filtered array to get the count of increases

const numIncreases = input
    .filter((ele, index, thisArray) => ele > thisArray[index -1])
    .length;

console.log("Number of Increasing depths: ", numIncreases);