/* I'm an idiot. I coded this whole thing over the course of an hour, and realized that I only calculated by 
adding the numbers that were exactly two indexes away.*/

// var rob = function (nums) {
//     if (nums.length == 1) {
//         return nums[0];
//     }
//     let max = 0;
//     let map = new Map();
//     let usedBegin = true;
//     let end = nums.length - 1;

//     // if beginning is used and end is used, then calculate the max with either or subtracted from the max

//     for (let i = 0; i < nums.length; i++) {
//         if (usedBegin && i === end && nums.length > 2) {
//             let next = Math.max(
//                 nums[i] + map.get(i - 2) - nums[0],
//                 nums[i] + map.get(i - 2) - nums[end]
//             );
//             map.set(i, next);
//             max = Math.max(max, next);
//         } else {
//             if (i > 1) {
//                 if (nums[i] + map.get(i - 2) < max && i - 2 === 0) {
//                     usedBegin = false;
//                 }
//             }
//             let next =
//                 i > 1 ? Math.max(nums[i] + map.get(i - 2), max) : nums[i];
//             map.set(i, next);
//             max = Math.max(max, next);
//         }
//     }
//     return max;
// };

// new approach 1/19/22. I finally looked up hints, and found one with memoization I think it's called. This one
// works. I was on the right track, but I need to understand this approach just a little better. Memoization
// isn't that bad.

var rob = function (nums) {
    if (nums.length < 2) {
        return nums[0] || 0;
    }
    let memo1 = [nums[0]];
    let memo2 = [0, nums[1]];

    // this is basically doing the exact same thing as the original house robber example except that memo2
    // is placing 0 in front because you don't want to calculate it in...

    for (let i = 1; i < nums.length - 1; i++) {
        memo1[i] = Math.max(nums[i] + (memo1[i - 2] || 0), memo1[i - 1]);
    }

    for (let j = 2; j < nums.length; j++) {
        memo2[j] = Math.max(nums[j] + (memo2[j - 2] || 0), memo2[j - 1]);
    }

    return Math.max(memo1.pop(), memo2.pop());
};

let nums = [1, 2, 3, 4, 5];
console.log(rob(nums));
