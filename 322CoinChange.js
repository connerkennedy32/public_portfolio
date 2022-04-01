// You are given an integer array coins representing coins of different denominations and an
// integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of
// money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

// this DP approach is absolutely brilliant... I don't think I would think of this nor would I be able to code
// it right now. My first approach was through DFS and it was incredibly inefficient. I need to think DP more...

var coinChange = function (coins, amount) {
    const dp = Array(amount + 1).fill(Infinity); // This arr tells us how many coins we need for each amount.
    dp[0] = 0; // To make 0, we need 0 coins.
    for (let coin of coins) {
        // Check each coin
        for (let i = coin; i <= amount; i++) {
            // Iterate through the entire amount from coin
            dp[i] = Math.min(dp[i], dp[i - coin] + 1); // Update minimum number of needed coins.
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]; // If the last element is Infinity, then we cannot make the amount.
};

let coins = [1, 2, 5];
let amount = 5;
console.log(coinChange(coins, amount));
