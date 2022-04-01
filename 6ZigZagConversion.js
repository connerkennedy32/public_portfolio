// PAYPALISHIRING

// P   A   H   N
// A P L S I I G
// Y   I   R

// PAHNAPLSIIGYIR -> return

// PAY

// P   A
// A P L
// Y   I

//REMEMBER to think about what you're returning first and then work backwards
// I got caught in the trap of thinking I needed to place each value at a specific
// x and y coordinate, when I didn't actually need to worry about the x because the answer
// didn't ask for the printed model, just the printed string... I was busting my brain trying
// to get it to print the model correctly... but if I had started at the answer, it would have
// changed my thinking around...

const s = "PAYPALISHIRING";

function zigZag(s, numRows) {
    if (numRows === 1 || s.length < numRows) return s;

    let rows = [];
    let reverse = false;
    let count = 0;
    let groupNum = (numRows - 1) * 2;

    // prepare rows
    for (let i = 0; i < numRows; i++) rows[i] = [];
    // reverse the push flow when reaching turning points

    for (let i = 1; i < s.length; i++) {
        if (!rows[0][0]) {
            rows[0].push(s[0]);
        }

        //at turning points, change reverse
        reverse ? count-- : count++;
        if (i % groupNum === 0 || i % groupNum === groupNum / 2)
            reverse = !reverse;
        rows[count].push(s[i]);
    }

    let ans = "";

    for (i = 0; i < rows.length; i++) {
        rows[i] = rows[i].join("");
        ans += rows[i];
    }
    console.log(ans);
}

zigZag(s, 4);
