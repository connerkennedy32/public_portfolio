// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.

//Order first

1, 1, 2, 3, 5, 7, 7; // -> 26 / 2 = 13
// probably not

//FOUND THIS SOLUTION ON LEETCODE. 12/12/21 -> I don't understand it yet

function canParse(nums) {
    var sum = nums.reduce((a, b) => a + b, 0);

    if (sum % 2 !== 0) {
        console.log(false);
        return;
    }

    var half = sum / 2; // Never will have decimal, hence safe to just divide.

    // Now, our aim is to find if atleast one subarray has the sum equal to the value `half`
    // As we can be sure that the other half of the subarray will have the same value

    var dp = [];

    // Base cases
    dp[0] = true;

    // nums = [1,2,3,6]
    // half = 6

    // lines 39-44 I NEED to understand!!!
    for (var index = 0; index < nums.length; ++index) {
        var num = nums[index];
        for (var i = half; i >= num; --i) {
            dp[i] = dp[i] || dp[i - num];
        }
    }

    console.log(dp[half] || false);
}
const numbers = [1, 1, 2, 3, 5, 7, 7];

canParse(numbers);
