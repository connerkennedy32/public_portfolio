const list = {
    head: {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: {
                        value: 5,
                        next: null,
                    },
                },
            },
        },
    },
};

//I still don't understand why this works. I've looked at it for over an hour. For some reason
//the .next functions are the only ones changing head and evenHead...

function getOddEven(head) {
    if (!head) return head;

    let odd = head;
    let even = head.next;
    let evenHead = even;

    while (even != null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    console.log(head);
}

getOddEven(list.head);
