/* This one was brutal. I did it wrong the first time, then looked this approach up. I don't know if I would 
think about it in this binary search way... it was a HARD question after all. I'll keep working on it. 3/30/22*/

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
    let low = Math.max(...nums);
    let high = 0;
    let ans = 0;

    for (let num of nums) {
        high += num;
    }

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (isPossible(nums, mid, m)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
};

function isPossible(arr, mid, noOfParts) {
    //FILL IN
    let parts = 1;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (sum > mid) {
            parts++;
            sum = arr[i];
        }
    }
    return parts <= noOfParts;
}
