/* Did this in 10 minutes. Had to look up syntax for the forEach loop. Extremely easy, couldn't do it this easy
a month ago. 1-11-22 */
var intersection = function (nums1, nums2) {
    let map = new Map();
    let ans = new Map();
    let arr = [];

    for (let i = 0; i < nums1.length; i++) {
        map.set(nums1[i], true);
    }

    for (let j = 0; j < nums2.length; j++) {
        if (map.has(nums2[j])) {
            ans.set(nums2[j], true);
        }
    }

    ans.forEach((value, key) => {
        /* ... */
        arr.push(key);
    });

    return arr;
};

let nums1 = [4, 9, 5],
    nums2 = [9, 4, 9, 8, 4];
console.log(intersection(nums1, nums2));
