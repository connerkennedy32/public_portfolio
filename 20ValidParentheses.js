// Input: s = "()"
// Output: true
// Example 2:

// Input: s = "()[]{}"
// Output: true
// Example 3:

// Input: s = "(]"
// Output: false

// Input: s = "(({{{)}}})"
// Output = false

//stack
let s = "({[]})";

function valid(s) {
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
            stack.push(s[i]);
        } else {
            let top = stack.length - 1;
            if (
                (s[i] === ")" && stack[top] === "(") ||
                (s[i] === "]" && stack[top] === "[") ||
                (s[i] === "}" && stack[top] === "{")
            ) {
                stack.pop();
            } else {
                console.log("FALSE");
                return;
            }
        }
    }
    if (stack.length === 0) {
        console.log("TRUE");
        return;
    }

    // stack -> if opening parentheses, add to stack,
    //       -> if closing parentheses, check to see top of stack, if top of stack is correct opening, pop
    // true if order is right
    // true if number of parentheses is right
    // -> stack should be empty
    // false if anything else
    //return true or false
    console.log("TEST");
}

valid(s);
