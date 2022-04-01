// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1

// O(log n)

// I need to get better at this. I'll rewrite this one better. 12-18-21
// I recoded it, but it's not passing 100%. I've been working on it for awhile, so I'm moving on 12-19-21

function searchInRotatedArray(nums, target) {
    let lo = 0;
    let hi = nums.length - 1;

    // Split array into two
    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    if (target > nums[hi] && hi > 0) {
        // traverse first array
        lo = 0;
        hi -= 1;
    } else {
        // traverse second array
        hi = nums.length - 1;
    }

    // binary search through the array
    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === target) {
            console.log(mid);
            return;
        }
        if (nums[mid] > target) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    if (nums[hi] === target) {
        console.log(hi);
        return;
    }
    console.log("-1");
    // Binary Search within the right part of the array
    //Return the index of target in nums else -1
}

const nums = [5, 1, 3];

searchInRotatedArray(nums, 3);
