let input = [-2, 3, 12, -1, -3];

// O(n)
// Maximum product of SUBARRAY (next to eachother)
// Dynamic Programming

//12/3 still haven't figured this one out completely...
//12/3 afternoon: Just figured it out! Needed to add a variable that stores the lowest negative value as well
function maxSubarray(inp) {
    let max = -Number.MAX_VALUE;
    let currPos = 0;
    let currNeg = 0;
    let prevPos = 0;
    let prevNeg = 0;

    for (let i = 0; i < inp.length; i++) {
        if (i == 0) {
            max = inp[i];
            currPos = inp[i];
            currNeg = inp[i];
        } else {
            currPos = Math.max(inp[i], inp[i] * prevPos, inp[i] * prevNeg);
            currNeg = Math.min(inp[i], inp[i] * prevPos, inp[i] * prevNeg);
        }
        prevPos = currPos;
        prevNeg = currNeg;
        max = Math.max(max, currPos);
    }
    console.log(max);
}

maxSubarray(input);

// -4 -8 -16 -3  -> largest negative -> largestNeg
// -4  2  4  48  -> largest overall  -> curr
// -4  2  2  -3  -> input
