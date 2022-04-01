/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let width = matrix[0].length - 1;

    // Find the row the target should be on

    // I could make this another binary search as well... but i didn't think about that until the second time through
    let row = 0;
    while (matrix[row][width] < target) {
        row++;
        if (matrix[row]) {
            continue;
        } else {
            return false;
        }
    }

    let start = 0;
    let end = width;

    while (start <= end) {
        if (matrix[row][start] === target) {
            return true;
        } else if (matrix[row][start] < target) {
            start++;
        } else {
            return false;
        }
    }
};
