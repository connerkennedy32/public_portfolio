/* Solved this in about an hour. I could definitely not solve this a month ago! 1-10-22  */
let isIsland = false;
var numIslands = function (grid) {
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            //hit every point in the grid
            isIsland = false;
            try {
                searchIsland(grid, row, col);
                if (isIsland) count++;
            } catch (err) {
                console.log(err);
            }
        }
    }
    return count;
};

function searchIsland(grid, row, col) {
    if (grid[row][col] === "1") {
        isIsland = true;
        grid[row][col] = "0";
        if (row > 0) {
            searchIsland(grid, row - 1, col);
        }
        if (row < grid.length - 1) {
            searchIsland(grid, row + 1, col);
        }
        if (col > 0) {
            searchIsland(grid, row, col - 1);
        }
        if (col < grid[0].length - 1) {
            searchIsland(grid, row, col + 1);
        }
    }
}

let grid = [["1", "0", "1", "1", "0", "1", "1"]];
console.log(numIslands(grid));
