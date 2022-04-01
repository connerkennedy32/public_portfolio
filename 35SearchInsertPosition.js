// Example 1:

// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:

// Input: nums = [1,3,5,6], target = 2
// Output: 1
// Example 3:

// Input: nums = [1,3,5,6], target = 7
// Output: 4

function searchIndex(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    //ALWAYS ADD less than or EQUAL TO
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        }

        if (nums[mid] > target) {
            right = mid - 1;
        }

        if (nums[mid] === target) {
            console.log(mid);
            return;
        }
    }
    // The left index will ALWAYS be the correct position for the target if we get through the While loop
    console.log(left);

    console.log("TEST");
}

const nums = [1, 3, 5, 6];
const target = -234;
searchIndex(nums, target);
// return an index no matter what
