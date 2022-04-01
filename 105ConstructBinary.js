/* I've been struggling with this one for a few hours. I found a solution myself on paper, but I couldn't code it,
I found this solution in the discussion and now I'm trying to understand it better. 1-31-22*/
// 2-1-22 Still confused...
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

var buildTree = function (preorder, inorder) {
    p = i = 0;
    build = function (stop) {
        if (inorder[i] != stop) {
            //therefore, there needs to be another node
            var root = new TreeNode(preorder[p++]);
            root.left = build(root.val);
            i++;
            root.right = build(stop);
            return root;
        }
        return null;
    };
    return build();
};

let preorder = [3, 9, 20, 15, 7];
let inorder = [9, 3, 15, 20, 7];

console.log(buildTree(preorder, inorder));
