let input = require("./input.json");

const numIncreases = input
    .map((ele, i) => {
        if(input[i + 1] && input[i + 2]) {
            return ele + input[i + 1] + input[i + 2];
        } 
    })
    .filter(ele => ele) //filter fn removes all falsey values by default
    .filter((ele, index, thisArray) => ele > thisArray[index - 1])
    .length
  
console.log("Number of Increasing depths (using 3 measurement sliding sum): ", numIncreases);