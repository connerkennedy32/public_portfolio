function ListNode(val) {
    this.val = val;
    this.next = null;
}
// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order, and each of their nodes contains a single digit.
// Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// 2 -> 4 -> 3
// 5 -> 6 -> 4
// 7 -> 0 -> 8

// 12-15-21 after taking about 2 hours to really undersand this, I was able to replicate it all in about 11 minutes... Not too shabby

let inp1 = [9, 9, 9, 9, 9, 9, 9];
let inp2 = [9, 9, 9, 9];

let l1 = new ListNode(0);
let curr = l1;
let l2 = new ListNode(0);

for (let i = 0; i < inp1.length; i++) {
    curr.val = inp1[i];
    curr.next = inp1[i + 1] ? new ListNode(0) : null;
    curr = curr.next;
}

curr = l2;
for (let i = 0; i < inp2.length; i++) {
    curr.val = inp2[i];
    curr.next = inp2[i + 1] ? new ListNode(0) : null;
    curr = curr.next;
}

function addTwoNumbers(l1, l2) {
    let l3 = new ListNode(0);
    let curr = l3;
    let carry = 0;

    while (l1 || l2 || carry > 0) {
        let sum1 = l1 ? l1.val : 0;
        let sum2 = l2 ? l2.val : 0;

        let sum = sum1 + sum2 + carry;

        carry = sum >= 10 ? Math.floor(sum / 10) : 0;

        curr.val = sum % 10;

        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;

        curr.next = l1 || l2 || carry > 0 ? new ListNode(0) : null;
        curr = curr.next;
    }
    console.log(l3);
}

addTwoNumbers(l1, l2);
