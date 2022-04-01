// Not gonna lie. I worked on this problem for awhile and eventually looked for a little help. I just needed
// for an approach and I got one that was brilliant and then coded it myself. I had the logic completely
// dynamically coded, but it couldn't deal with long ints. I submitted this one with a slightly guilty conciense
// 1/8/22

function consecutive(num) {
    // let map = new Map();
    // map.set(0, true);
    // let count = 0;
    // let sum = 0;
    // for (let i = 1; i <= Math.ceil(num / 2); i++) {
    //     sum = (sum + i) % num;
    //     if (map.has(sum)) {
    //         count++;
    //     }
    //     map.set(sum, true);
    // }
    // return count;
    let sum = 1;
    let count = 0;
    for (let i = 2; i < Math.ceil(num / 2); i++) {
        sum += i;

        if (sum > num) {
            break;
        }

        if ((num - sum) % i == 0) {
            count++;
        }
    }
    return count;
}

let num = 15;
console.log(consecutive(num));
