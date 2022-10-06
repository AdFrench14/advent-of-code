let input = require("./input.json");

//I am going to treat "down" as a positive movement in z-axis and "up" as negative in z-axis (since we are speaking in terms of depth)
//I am going to treat "forward" as positive movement in x-axis. there doesn't appear to be a "backward"

const position = {
    x: 0,
    z: 0
};

input.map(movement => {
    return movement.split(" ");
}).map(([directive, magnitude]) => {
    magnitude = parseInt(magnitude);
    return [directive, magnitude];
}).map(([directive, magnitude]) => {
    switch (directive) {
        case "forward": {
            position.x += magnitude;
            break;
        }
        case "down": {
            position.z += magnitude;
            break;
        }
        case "up": {
            position.z -= magnitude;
            break;
        }
    }
});

console.log("Position: ", position);
console.log("Product of x and z positions: ", position.x * position.z);