/* 
I copied and pasted this code. I understand it, but I am pretty far from being able to code it myself in a 
short amount of time.

I just spent about an hour looking into what heaps and priority Queues are. It makes sense to me, but I'm
bummed that there isn't a built in feature for javaScript. Either way, all a max heap is is a dynamic binary
search tree that updates as values are inserted and removed, but index 0 is always the max value. Implimenting
a priority que just means that you pass the priority number with the data associated and sort by the priority
number insteadd of the values associated with the data. Pretty simple to understand, hard to implement. 1/1/22*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
    if (!nums1.length || !nums2.length) return [];

    let heap = new MaxBinaryHeap();

    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            let elem = {
                index: [nums1[i], nums2[j]],
                val: nums1[i] + nums2[j],
            };

            if (heap.size < k) {
                heap.insert(elem);
            } else if (elem.val < heap.values[0].val) {
                heap.extract();
                heap.insert(elem);
            } else {
                break;
            }
        }
    }

    let ans = heap.values.map((n) => n.index);
    return ans;
};

class MaxBinaryHeap {
    get size() {
        return this.values.length;
    }

    constructor() {
        this.values = [];
    }

    insert(elem) {
        this.values.push(elem);
        let index = this.size - 1;
        if (index === 0) return;

        let parentIndex = Math.floor((index - 1) / 2);

        while (
            this.values[parentIndex] &&
            this.values[parentIndex].val < this.values[index].val
        ) {
            [this.values[parentIndex], this.values[index]] = [
                this.values[index],
                this.values[parentIndex],
            ];
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    extract() {
        let parentIndex = 0;
        let lastIndex = this.size - 1;
        [this.values[parentIndex], this.values[lastIndex]] = [
            this.values[lastIndex],
            this.values[parentIndex],
        ];
        let result = this.values.pop();

        let leftChildIndex = 2 * parentIndex + 1;
        let rightChildIndex = 2 * parentIndex + 2;

        while (
            (this.values[leftChildIndex] !== undefined &&
                this.values[leftChildIndex].val >
                    this.values[parentIndex].val) ||
            (this.values[rightChildIndex] !== undefined &&
                this.values[rightChildIndex].val > this.values[parentIndex].val)
        ) {
            let highestChildIndex;
            if (
                this.values[leftChildIndex] === undefined ||
                this.values[rightChildIndex] === undefined
            ) {
                highestChildIndex = leftChildIndex || rightChildIndex;
            } else {
                highestChildIndex =
                    this.values[leftChildIndex].val >
                    this.values[rightChildIndex].val
                        ? leftChildIndex
                        : rightChildIndex;
            }
            [this.values[parentIndex], this.values[highestChildIndex]] = [
                this.values[highestChildIndex],
                this.values[parentIndex],
            ];
            parentIndex = highestChildIndex;
            leftChildIndex = 2 * parentIndex + 1;
            rightChildIndex = 2 * parentIndex + 2;
        }
        return result;
    }
}

let nums1 = [1, 7, 11];
let nums2 = [2, 4, 9];
let k = 3;
console.log(kSmallestPairs(nums1, nums2, k));
