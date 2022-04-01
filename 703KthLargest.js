// Sounds like I'll need to learn heaps for this question, but JavaScript doesn't have it built in
// so all of the solutions show people building them from scratch... I'll take a look at it later.
// 12/27/21

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    this.nums = nums;
    return;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    this.nums.push(val);
};

let obj = new KthLargest(3, [2, 5, 6, 7]);
let ans = obj.add(9);
console.log(obj);

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
