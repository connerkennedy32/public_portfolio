/* I did this on my own this time. I understand BFS a bit better than I did before. I need a 
few more questions to really nail it down. 2-8-22 */

var zigzagLevelOrder = function (root) {
    if (!root) return [];
    let q = [root];
    let ans = [];
    let right = false;
    while (q.length) {
        let qlen = q.length;
        let row = [];
        for (let i = 0; i < qlen; i++) {
            let tempNode = q.shift();
            row.push(tempNode.val);
            if (tempNode.left) {
                q.push(tempNode.left);
            }
            if (tempNode.right) {
                q.push(tempNode.right);
            }
        }
        if (right) {
            row = row.reverse();
        }
        right = !right;
        ans.push(row);
    }
    return ans;
};
