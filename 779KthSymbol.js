// N is basically irrelevant? That's what it seems like...

// Completely on my own! This one took awhile, but I feel pretty good about it. It's pretty dynamic.
// 12-26-21
var kthGrammar = function (n, k) {
    if (k === 1) return 0;
    let test = Math.ceil(Math.log2(k));

    let next = k - 0.5 * Math.pow(2, test);
    let count = 1;
    while (next > 1) {
        test = Math.ceil(Math.log2(next));
        next = next - 0.5 * Math.pow(2, test);
        count++;
    }
    return count % 2 === 0 ? 0 : 1;
};

console.log(kthGrammar(30, 434991989));
