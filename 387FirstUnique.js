// first attempt is using a map... not super efficient. I didn't even think about using a set... 12/30/21
var firstUniqChar = function (s) {
    let map = new Map();
    let min = Number.MAX_VALUE;

    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i])) {
            map.set(s[i], [true, i]);
        } else {
            map.set(s[i], [false, -1]);
        }
    }

    let isFound = false;

    map.forEach((value, key) => {
        if (value[0] === true) {
            min = Math.min(min, value[1]);
            isFound = true;
        }
    });
    return isFound ? min : -1;
    // return the index for first non-repeating character
};

// second attempt using a set. I copied this one over. Pretty smart. I think I need to use .indexOf more. It
// is pretty effecient.
var firstUniqChar2 = function (s) {
    let set = new Set();
    for (let i = 0; i < s.length; ++i) {
        if (s.indexOf(s[i], i + 1) === -1 && !set.has(s[i])) return i;
        else set.add(s[i]);
    }
    return -1;
};

let s = "lleetcode";
console.log(firstUniqChar(s));
console.log(firstUniqChar2(s));
