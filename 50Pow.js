// The logic works great, but it can't handle the case at the bottom. It's too big, and I can't find a good
// source to be able to solve that easily. 12-23-21

let myPow = function (x, n) {
    if (n === 0) return 1;
    let isNeg = n < 0 ? true : false;
    n = isNeg ? n * -1 : n;
    let mult = (curr, number, prev) => {
        if (number === 1) {
            return isNeg ? 1 / curr : curr;
        }
        return mult(curr * prev, number - 1, prev);
    };
    return mult(x, n, x);
};

const x = 0.00001;
const n = 2147483647;

console.log(myPow(x, n));
