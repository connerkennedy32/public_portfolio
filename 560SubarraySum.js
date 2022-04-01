// This works. I did it completely without help, it's pretty dynamic, but I can do better... It ran everything
// except the super long one on LeetCode. I need to get even better. 12-29-21

// I'll work on this one more tomorrow.

var subarraySum1 = function (nums, k) {
    let map = {};

    let previous = [0];
    for (let j = 0; j < nums.length; j++) {
        let curr = nums[j];
        let newPrev = [];
        if (!map[curr]) {
            map[curr] = 1;
        } else {
            map[curr] += 1;
        }
        newPrev.push(curr);
        for (let prev of previous) {
            if (j === 0) {
                map[curr + prev] = 1;
            } else {
                if (!map[curr + prev]) {
                    map[curr + prev] = 1;
                } else {
                    map[curr + prev] += 1;
                }
                newPrev.push(curr + prev);
            }
        }
        previous = newPrev;
    }
    return map[k] ? map[k] : 0;
};

// Brilliant solution from leetcode... I looked at the code and then re-coded it. I'm beginning to start
// thinking like this... I
var subarraySum2 = function (nums, k) {
    let map = new Map();
    let sum = 0;
    let count = 0;
    map.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (map.has(sum - k)) count += map.get(sum - k);

        if (map.has(sum)) map.set(sum, map.get(sum) + 1);
        else map.set(sum, 1);
    }

    return count;
};

// let nums = [1, 3, 2, 3, 1, 2];
let nums = [-10, 18, 0, 8, 3];
// let nums = [1, 1, 1];
let k = 8;
// console.log(subarraySum1(nums, k));
console.log(subarraySum2(nums, k));
