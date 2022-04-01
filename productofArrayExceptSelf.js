// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

let input = [1,2,3,6];
// let input = [1,1,1,1];
// let input = []; -> 0
// return answer -> []
// O(N)

function productOfArray(inp) {
    let prod = 1;
    for (let i = 0; i < inp.length; i++) {
        prod = prod * inp[i];
    }
    
    for (let j = 0; j < inp.length; j++) {
        inp[j] = prod / inp[j];
    }

    console.log(inp)
}

productOfArray(input);


// THIS IS NOT COMPLETE AND DOESNT QUITE WORK!!!
