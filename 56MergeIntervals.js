/* This one was brutal for some reason. I needed to look up a solution for the first time in awhile.
I found one very similar to this and then recoded it. It would have taken me forever to think about
the question like this, but I'm getting there. 2-14-22*/

var merge = function(intervals) {
    if (intervals.lengh < 2) return intervals;
    intervals.sort((a,b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];
        let prev = intervals[i - 1];
        if (curr[0] <= prev[1]) {
            intervals[i] = [Math.min(prev[0], curr[0]), Math.max(prev[1], curr[1])];
            intervals.splice(i - 1, 1);
            i--;
        }
    }
    return intervals;
};


// let intervals = [[1,10],[2,3],[4,5],[6,7],[8,9]];
let intervals = [[1,3],[2,6],[8,10],[15,18],[8,9]];
console.log(merge(intervals));