/* Took about 20 minutes to come up with this approach. I was thinking about doing it dynamically at first, 
but this one seemed to be a bit better when I thought about it. It took about 15 minutes to code it after thinking
of the solution. 1/24/22 */

var minSubArrayLen = function (target, nums) {
    let s = 0;
    let e = 1;
    let sum = 0;
    let tempSize = 2;
    let isPossible = false;
    let ans = Number.MAX_VALUE;
    sum = nums[s] + nums[e];
    if (nums[s] >= target) {
        return 1;
    }
    while (s <= e) {
        if (sum >= target) {
            ans = Math.min(tempSize, ans);
            isPossible = true;
            sum -= nums[s];
            s++;
            tempSize--;
        } else {
            if (e > nums.length - 1) {
                break;
            }
            e++;
            sum += nums[e];
            tempSize++;
        }
    }
    if (isPossible) {
        return ans;
    } else {
        return 0;
    }
};

let arr = [1, 1, 1, 1, 1, 1, 1, 1];
console.log(minSubArrayLen(11, arr));
