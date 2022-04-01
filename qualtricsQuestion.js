// let input = "hehello";
// let input = "";
let input = "qqqqqqqqqqqqqqqqqqqqaq"
// let input = "hEleo"

function qualtrics(inp) {
    let ans = "FALSE";
    if (inp.length == 0) {
        ans = "TRUE";
        console.log(ans);
        return;
    }

    let pattern = {};
    for (let i = 0; i < inp.length; i++) {
        if(pattern[inp[i]]) {
            pattern[inp[i]].last = i;
        } else {
            pattern[inp[i]] = {"first": i, "last": i};
        }
    }

    let prev = -Number.MAX_VALUE;
    for (let j = 0; j < inp.length; j++) {
        if (inp[j] === inp[j - 1] && j !== 0) {
            continue;
        }
        let curr = pattern[inp[j]].first;
        if (curr < prev) {
            console.log("FALSE");
            return;
        } else {
            prev = pattern[inp[j]].last;
        }
    }
    ans = "TRUE";
    console.log(ans);
}

qualtrics(input);