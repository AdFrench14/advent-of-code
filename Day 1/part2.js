let input = require("./input.json");

const numIncreases = input
    .map((ele, index, thisArray) => {
        if(thisArray[index + 2]) { //if i+2 doesn't exist, we have reached the last group of measurements
            return ele + thisArray[index + 1] + thisArray[index + 2];
        } 
    })
    .filter(ele => ele) //filter removes all falsey values by default. my .map leaves a couple of undefined values at the end
    .filter((ele, index, thisArray) => ele > thisArray[index - 1]) //if this sum is greater than the last sum, keep it in the array
    .length
  
console.log("Number of Increasing depths (using 3 measurement sliding sum): ", numIncreases);