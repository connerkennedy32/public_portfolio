let numbers = [5,-1,-2,-4,5,3,-4];

function maxSubArray(nums) {
    let prev = 0;
    let max = -Number.MAX_VALUE;

    for (let i = 0; i < nums.length; i++) {
        prev = Math.max(prev + nums[i], nums[i]);
        max = Math.max(prev, max);
    }

    console.log(max);
}

maxSubArray(numbers);