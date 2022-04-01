// Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// Output: 15
// Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
// 1st day: 1, 2, 3, 4, 5
// 2nd day: 6, 7
// 3rd day: 8
// 4th day: 9
// 5th day: 10

// weights = [1, 50], days = 2
// output = 50

function shipPackages(weights, D) {
    let left = Math.max(...weights);
    var right = weights.reduce((a, b) => a + b);

    // I'm learning that there are different variations of binary search. This one doesn't use <= because I'm just returning the left indice... Kind of strange 12-21-21
    while (left < right) {
        let current = 0;
        let needed = 1;
        let mid = Math.floor((left + right) / 2);
        for (let i = 0; i < weights.length; i++) {
            if (current + weights[i] > mid) {
                needed += 1;
                current = weights[i];
            } else {
                current += weights[i];
            }
        }
        if (needed > D) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    console.log(left);
}

// const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const days = 5;

const weights = [3, 2, 2, 4, 1, 4];
const days = 3;

// const weights = [1, 2, 3, 1, 1];
// const days = 4;

shipPackages(weights, days);
