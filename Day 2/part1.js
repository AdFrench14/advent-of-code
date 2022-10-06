let input = require("./input.json");

//I am going to treat "down" as a positive movement in z-axis and "up" as negative in z-axis (since we are speaking in terms of depth)
//I am going to treat "forward" as positive movement in x-axis. there doesn't appear to be a "backward"

const position = {
    x: 0,
    z: 0
};

//Step 1
const result = input.map(movement => {
    return movement.split(" ");
}).map(([direction, magnitude]) => {
    magnitude = parseInt(magnitude);
    return [direction, magnitude];
}).map(([direction, magnitude]) => {
    direction == "forward" ? position.x += magnitude
    : direction == "down" ? position.z += magnitude
    : direction == "up" ? position.z -= magnitude
    : console.log(`Error: direction didn't match one of the accepted options: ${direction}`);
});

console.log("Position: ", position);
console.log("Product of x and z positions: ", position.x * position.z);