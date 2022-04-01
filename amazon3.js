/* I had to white board this one... It really isn't that hard of a question, but I couldn't remember how to iterate through an
object. If I could look it up really fast, it would have been much easier and I would have got it perfectly. I also tried to do
it in place in the beginning but he said a good approach was to create a separate object and go from there... 2/24/22*/

let input = {"fiction": ["124", "564", "642"], "nonfiction": ["124", "432", "897"], "history": ["444", "432", "988", "897"]}

let noDuplicates = function(inp) {
    if (!inp) {
        return {};
    }
    let map = new Map();
    let obj = {};
    for (let value in inp) {
        // console.log(value, inp[value]);
        let arr = [];
        for (let i = 0; i < inp[value].length; i++) {
            // console.log(inp[value][i])
            if (!map.has(inp[value][i])) {
                arr.push(inp[value][i]);
                map.set(inp[value][i], true);
            }
        }
        obj[value] = arr;
    }
    return obj;
}

// console.log(noDuplicates(input));

/* I could have used splice!! The interviewer told me to steer away from it even though it would have solved it in place... */

let noDuplicates2 = function(inp) {
    if (!inp) {
        return {};
    }
    let map = new Map();
    let obj = {};
    for (let value in inp) {
        // console.log(value, inp[value]);
        let arr = [];
        for (let i = 0; i < inp[value].length; i++) {
            // console.log(inp[value][i])
            if (!map.has(inp[value][i])) {
                // arr.push(inp[value][i]);
                map.set(inp[value][i], true);
            } else {
                inp[value].splice(i, 1);
            }
        }
        // obj[value] = arr;
    }
    return inp;
}

console.log(noDuplicates2(input));