// I cannot for the life of me figure this one out. I took forever trying to come up
// with an approach, and I couldn't find one. I looked up an approach and then tried
// to code it without looking at the example. I couldn't. After taking looks at different
// examples, I still can't get it to work.

var maxAreaOfIsland = function (grid) {
    const res = { count: 0 };
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            dfs(grid, r, c, res);
        }
    }
    return res.count;
};

const dfs = (grid, r, c, res, area = { count: 0 }) => {
    if (!grid[r] || !grid[r][c]) return;
    res.count = Math.max(res.count, (area.count += grid[r][c]));
    grid[r][c] = 0;
    dfs(grid, r, c - 1, res, area);
    dfs(grid, r, c + 1, res, area);
    dfs(grid, r - 1, c, res, area);
    dfs(grid, r + 1, c, res, area);
};

let grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
console.log(maxAreaOfIsland(grid));
