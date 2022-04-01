// This is using DP and I understand it, but I got it from the discussion board. The original one I
// had used DFS and it worked until the numbers got too big. 12-27-21
var uniquePaths = function (m, n) {
    let dp = new Array(m).fill(0).map(() => new Array(n));

    for (let row = m - 1; row >= 0; row--) {
        for (let col = n - 1; col >= 0; col--) {
            if (col === n - 1 || row === m - 1) {
                dp[row][col] = 1;
            } else {
                dp[row][col] = dp[row + 1][col] + dp[row][col + 1];
            }
        }
    }

    return dp[0][0];
};

console.log(uniquePaths(3, 3));
