// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// DFS
const digits = "23";

function letterCombo(digits) {
    const map = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    };

    const res = [];
    const dp = (index, string) => {
        if (index == digits.length) return res.push(string);

        // A for loop with recursion inside??
        for (let i = 0; i < map[digits[index]].length; i++) {
            dp(index + 1, string + map[digits[index]][i]);
        }
    };

    dp(0, "");
    return res;
}

let ans = letterCombo(digits);
console.log(ans);
