// DYNAMIC PROGRAMMING!!!
// 
// 

let numbers = [7,4,1,8,5,7,7,6,3];

function robberHouse(nums) {
    let prev = 0; //i - 2
    let curr = 0; //i - 1
    let temp;

    for (let i = 0; i < nums.length; i++) {
        temp = Math.max(nums[i] + prev, curr);

        prev = curr;
        curr = temp;
    }
    console.log(curr);
};

robberHouse(numbers);