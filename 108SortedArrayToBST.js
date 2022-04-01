function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

// I worked on this for awhile without using recursion, and I was on the right track. Everything is
// usually simpler than I make it, I just don't understand how BST's work quite yet but I'm getting
// better.

var sortedArrayToBST = function (nums) {
    // I forgot to add "null" here, and it was throwing an error. Remember to return something
    if (!nums.length) return null;
    let mid = Math.floor(nums.length / 2);
    let root = new TreeNode(nums[mid]);

    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid + 1));

    return root;
};

const nums = [-10, -5, 0, 4, 9];
console.log(sortedArrayToBST(nums));
