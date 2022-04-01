/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */

// I can't run this right now because I don't have the binary search tree, but I got this one working alone,
// I need to think more about negative values.
var hasPathSum = function (root, targetSum) {
    if (!root) return false;
    let isTrue = false;
    let dfs = (value, sum) => {
        if (sum === targetSum && !value.left && !value.right) isTrue = true;
        //if (sum > targetSum) return;
        if (value.right) {
            dfs(value.right, (sum += value.right.val));
            sum -= value.right.val;
        }
        if (value.left) {
            dfs(value.left, (sum += value.left.val));
            sum -= value.left.val;
        }
    };
    dfs(root, root.val);
    return isTrue;
};
