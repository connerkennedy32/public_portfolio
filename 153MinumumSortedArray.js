/* Figured it out first try. Ran it twice on leetcode, changed a few things, but then got it within 5 minutes!
This one would've tripped me up a few weeks ago. 1/1/22*/
var findMin = function (nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        if (nums[right - 1] < nums[right]) {
            right--;
        } else {
            return nums[right];
        }

        if (nums[left + 1] < nums[left]) {
            return nums[left + 1];
        } else {
            left++;
        }
    }

    return nums[0];
};
