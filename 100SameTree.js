function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

let tree = [1, 2, 3, 4, 5];

let bst = new TreeNode(tree[0]);
bst.left = new TreeNode(tree[1]);
bst.right = new TreeNode(tree[2]);
bst.left.left == new TreeNode(tree[3]);
bst.left.right == new TreeNode(tree[4]);

var isSameTree = function (p, q) {
    let queueOne = [p];
    let queueTwo = [q];

    while (queueOne.length > 0 && queueTwo.length > 0) {
        // Each of these is just one node element
        const currOne = queueOne.shift();
        const currTwo = queueTwo.shift();

        if (currOne && currTwo && currOne.val !== currTwo.val) {
            return false;
        }

        if (currOne && !currTwo) {
            return false;
        }

        if (currTwo && !currOne) {
            return false;
        }

        if (currOne) {
            queueOne.push(currOne.left);
            queueOne.push(currOne.right);
        }

        if (currTwo) {
            queueTwo.push(currTwo.left);
            queueTwo.push(currTwo.right);
        }
    }

    return queueOne.length === 0 && queueTwo.length === 0;
};

console.log(isSameTree(bst, bst));
