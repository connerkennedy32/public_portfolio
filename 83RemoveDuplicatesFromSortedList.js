/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/* I tried for awhile on this and then realized my answer was an array. They wanted it to be returned as
a sorted list. So I worked on it a little more and realized that I couldn't quite do it because I'm still
not very good at lists. This answer I retyped after looking at discussion. I understand it and I think I
can apply it to the next list question I do. 12-31-21 */
var deleteDuplicates = function (head) {
    let current = head;

    while (current) {
        if (current.next !== null && current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
};
