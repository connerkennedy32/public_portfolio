/* Solved this one in about 5 minutes. The next level up where you have to find which index it loops at is much
more difficult 2-4-22 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head) {
        return false;
    }
    let moveOne = head;
    let moveTwo = head;

    while (moveOne.next != null && moveTwo.next?.next != null) {
        moveOne = moveOne.next;
        moveTwo = moveTwo.next.next;
        if (moveOne === moveTwo) {
            return true;
        }
    }
    return false;
};
