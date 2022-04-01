var input = require("./input.json");

let arr = [];

for (let i = 0; i <= 100; i++) {
    arr[i] = [];
}

for (let j = 0; j < input.length; j++) {
    arr[input[j][1]][input[j][0]] = String.fromCharCode(input[j][2]);
}

let printLine = "";

for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y <= 100; y++) {
        if (!arr[x][y]) {
            printLine += " ";
        } else {
            printLine += arr[x][y];
        }
    }
    console.log(printLine);
    printLine = "";
}
