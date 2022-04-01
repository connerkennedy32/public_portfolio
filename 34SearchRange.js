// I'm going to start just looking up approaches more. They teach me faster than myself doing it. 3/30/22

var searchRange = function (nums, target) {
    // initiate binary search
    let l = 0;
    let r = nums.length - 1;

    // Find first occurence
    while (l < r) {
        let mid = Math.floor((l + r) / 2);
        if (nums[mid] >= target) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    if (nums[l] != target) return [-1, -1];
    let start = l;
    r = nums.length - 1;

    // Find last occurence
    while (l < r) {
        let mid = Math.floor((l + r) / 2);
        nums[mid] <= target ? (l = mid + 1) : (r = mid);
    }

    let last = nums[l] === target ? l : l - 1;

    return [start, last];
};
