//I tried to work backwards on this one. It seemed to be pretty effective.
// Started by asking myself "What needs to be returned and how do I get that answer" and everything flowed from there

// return length of longest substring

// let inp = "bbbbb";

// function longestSub(inp) {
//     let max = -Number.MAX_VALUE;
//     for (let i = 0; i < inp.length; i++) {
//         let count = 0;
//         let j = i;
//         let map = new Map();
//         while (!map.has(inp[j]) && inp[j]) {
//             map.set(inp[j], 1);
//             count++;
//             max = Math.max(max, count);
//             j++;
//         }
//     }
//     max = inp.length == 0 ? 0 : max;
//     console.log(max);

//     //
//     // if value isn't already used in the map, count++, and add to the map, go to the next inner index (j)
//     // if it is in the map already, clear the map, reset the inner index, and iterate to the next index
//     // Math.max(max, count)
//     // answer
// }

// longestSub(inp);

//
// THIS ONE IS BRILLIANT!! IF I COULD CODE SOMETHING LIKE THIS, THAT WOULD BE THE GOAL
//
// I need to learn how to better implement .substr() and .indexOf()

let s = "abcavceed";

var lengthOfLongestSubstring = function (s) {
    let tempStr = "";
    let maxStr = "";
    let currIndx = 0;
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        tempStr = s[i];

        currIndx = maxStr.indexOf(tempStr);

        if (currIndx > -1) {
            maxStr = maxStr.substring(currIndx + 1); // -> remember to add the +1! The substring function needs that so that it removes the element at the right place!
        }
        maxStr += tempStr;
        max = Math.max(max, maxStr.length);
    }
    console.log(max);
};

lengthOfLongestSubstring(s);
