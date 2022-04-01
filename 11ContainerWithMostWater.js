// input = [1,8,6,2,5,4,8,3,7] //49
input = [1,1] //49
//       0,1,2,3,4,5,6,7,8

function mostWater(inp) {
    let left = 0;
    let right = inp.length - 1;
    let max = -Number.MAX_VALUE;

    while (left < right) {
        max = Math.max(calcArea(left, inp[left], right, inp[right]), max);
        if (inp[left] > inp[right]) {
            right--;
        } else {
            left++;
        }
    }

    console.log(max);
}

function calcArea(leftI, leftH, rightI, rightH) {
    let height = Math.min(leftH, rightH);
    let width = rightI - leftI;

    return height * width;
}

mostWater(input);

