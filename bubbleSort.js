let s1 = "zxcvzcxvw";
let s2 = "werwet";

let map = new Map();

function twoStrings(str1, str2) {
    let isTrue = false;
    for (let i = 0; i < str1.length; i++) {
        map.set(str1[i], 1);
    }
    for (let j = 0; j < str2.length; j++) {
        if (map.has(str2[j])) {
            isTrue = true;
        }
    }
    console.log(isTrue);
}

twoStrings(s1, s2);