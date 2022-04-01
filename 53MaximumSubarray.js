// A month ago, I couldn't solve this. Today I solved it in 15 minutes without help... Im getting
// better. 12/27/21
var maxSubArray = function (nums) {
    let max = -Number.MAX_VALUE;
    let currMax = -Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        currMax = Math.max(nums[i], nums[i] + currMax);
        max = Math.max(max, currMax);
    }
    return max;
};

// let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// let nums = [1];
let nums = [5, 4, -1, 7, 8];
console.log(maxSubArray(nums));
