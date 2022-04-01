// Example 1:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:

// Input: nums = [1]
// Output: [[1]]

// This is ugly nasty code that could be worked on, but it works! I took one tiny hint from the discussion,
// and realized there was just ONE thing I needed to change. To improve, I would implement the map inside of
// the backtracking function instead of after. 12/23/21
let permute = function (nums) {
    let res = [];

    let dfs = (i, curr) => {
        if (curr.length == nums.length) return res.push(curr.slice());

        for (let j = 0; j < nums.length; j++) {
            curr.push(nums[j]);
            dfs(i, curr);
            // Only needed the .pop, didn't need the second dfs() call. Worked on this for an hour... 12/23/21
            curr.pop();
        }
    };
    dfs(0, []);

    let ans = [];

    for (let i = 0; i < res.length; i++) {
        let map = new Map();
        for (let j = 0; j < res[i].length; j++) {
            if (!map.has(res[i][j])) {
                map.set(res[i][j], true);
            } else {
                break;
            }
        }
        if (map.size === nums.length) {
            ans.push(res[i].slice());
        }
    }
    return ans;
};

const nums = [1, 2, 3];

console.log(permute(nums));
