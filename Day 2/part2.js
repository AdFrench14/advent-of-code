let input = require("./input.json");

const position = {
    x: 0,
    z: 0,
    aim: 0
};

input.map(movement => {
    return movement.split(" ");
}).map(([directive, magnitude]) => {
    return [directive, parseInt(magnitude)];
}).map(([directive, magnitude]) => {
    switch (directive) {
        case "forward": {
            position.x += magnitude;
            position.z += position.aim * magnitude;
            break;
        }
        case "down": {
            position.aim += magnitude;
            break;
        }
        case "up": {
            position.aim  -= magnitude;
            break;
        }
    }
});

console.log("Position: ", position);
console.log("Product of x and z positions: ", position.x * position.z);