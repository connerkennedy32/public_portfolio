/* I'm starting to get the hang of BFS. It involves queues. Hopefully I can do it completely without the help
of Leetcode discussion boards. I needed a little bit of help to figure out how to get each layer separated
2-4-22 */

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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) {
        return [];
    }
    let queue = [root];
    let ans = [];
    while (queue.length) {
        let row = [];
        let qlen = queue.length;
        for (let i = 0; i < qlen; i++) {
            let tempNode = queue.shift();
            row.push(tempNode.val);
            if (tempNode.left) {
                queue.push(tempNode.left);
            }
            if (tempNode.right) {
                queue.push(tempNode.right);
            }
        }
        ans.push(row);
    }
    return ans;
};
