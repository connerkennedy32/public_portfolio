// Given an array of integers nums and an integer target, return indices
//of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Output: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

let input = [3, 3];
let target = 6;

//return [0,1]

function twoSum(inp, targ) {
    //sort the array
    let map = new Map();
    for (let i = 0; i < inp.length; i++) {
        if (!map.has(inp[i])) {
            map.set(inp[i], [i, i]);
        } else {
            map.set(inp[i], [map.get(inp[i])[0], i]);
        }
    }
    inp.sort(function (a, b) {
        return a - b;
    });

    let left = 0;
    let right = inp.length - 1;

    while (left < right) {
        if (inp[left] + inp[right] === targ) {
            console.log(
                "[" + map.get(inp[left])[0] + "," + map.get(inp[right])[1] + "]"
            );
            return;
        } else if (inp[left] + inp[right] < targ) {
            left++;
        } else {
            right--;
        }
    }
}

twoSum(input, target);
