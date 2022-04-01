// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]

//Backtracking

// I recoded this solution that I found on discussion board on leetcode... I had the right approach before
// I looked it up, but I couldn't implement it. I understand this decently, but I need to practice
// backtracking a bit more... 12-22-21

function comboSum(candidates, target) {
    var buffer = [];
    var result = [];
    search(0, target);
    return result;

    function search(index, target) {
        if (target === 0) {
            result.push(buffer.slice());
            return;
        }
        if (target < 0) return;
        if (index === candidates.length) return;

        buffer.push(candidates[index]);
        search(index, target - candidates[index]);
        buffer.pop();
        search(index + 1, target);
    }
}

const cand = [2, 3, 5];
const target = 10;
let ans = comboSum(cand, target);
// return array of valid combinations
console.log(ans);
