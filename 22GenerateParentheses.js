// Given n pairs of parentheses, write a function to generate all combinations of
// well-formed parentheses.

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

// 2 pairs of parentheses

//DFS, the first one I coded basically by myself...
const n = 3;
function parentheses(n) {
    let res = [];

    const dfs = (str, n, l, r) => {
        if (n === 0 && l === 0 && r === 0) {
            res.push(str);
            return;
        }
        if (r >= l) {
            if (l > 0) {
                dfs(str + "(", n - 1, l - 1, r);
            }
            if (r > 0) {
                dfs(str + ")", n - 1, l, r - 1);
            }
        }
    };
    dfs("", n * 2, n, n);

    console.log(res);
    // return array of strings of all possible combinations
}

parentheses(n);

console.log("TEST");
