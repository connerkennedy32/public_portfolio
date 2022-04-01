// Example 1:

// Input: strs = ["eat","tea","ate",""tan",nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]

let anagram = function (str) {
    let map = new Map();

    for (let i = 0; i < str.length; i++) {
        if (!map.has(str[i].split("").sort().join(""))) {
            map.set(str[i].split("").sort().join(""), [str[i]]);
        } else {
            let newVal = map.get(str[i].split("").sort().join(""));
            newVal.push(str[i]);
            map.set(str[i].split("").sort().join(""), newVal);
        }
    }

    let ans = [];
    map.forEach((value, key) => {
        ans.push(value);
    });
    return str;
};

const str = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(anagram(str));
