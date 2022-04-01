// This isn't working completely. I don't really have the patience today to figure out everything... 12/28/21
var uniquePaths = function (obstacleGrid) {
    // let dp = new Array(m).fill(0).map(() => new Array(n));
    let dp = obstacleGrid;
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    for (let row = m - 1; row >= 0; row--) {
        for (let col = n - 1; col >= 0; col--) {
            if (dp[row][col] === 1) {
                dp[row][col] = 0;
            } else if (col === n - 1 || row === m - 1) {
                dp[row][col] = 1;
            } else {
                dp[row][col] = dp[row + 1][col] + dp[row][col + 1];
            }
        }
    }

    if (dp[m - 1][n - 1] === 0) return 0;
    return dp[0][0];
};

console.log(
    uniquePaths([
        [0, 0],
        [1, 1],
        [0, 0],
    ])
);
