// Very inefficient but it works!! This is the first time I was able to pass a leetcode problem with some
// DP without help. Getting better. 12-29-21

var lengthOfLIS = function (nums) {
    let map = new Map();
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        let isThere = false;
        let longest = 0;
        map.forEach((value, key) => {
            if (key < nums[i]) {
                longest = Math.max(longest, value);
                isThere = true;
            }
        });
        if (!isThere) {
            map.set(nums[i], 1);
        } else {
            map.set(nums[i], longest + 1);
        }
    }
    map.forEach((value, key) => {
        max = Math.max(max, value);
    });

    return max;
};

// let nums = [0, 1, 0, 3, 2, 3, 4, 6];
let nums = [1, 1, 1, 1, 1, 1, 1, 1];
console.log(lengthOfLIS(nums));
