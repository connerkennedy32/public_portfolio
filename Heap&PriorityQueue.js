class MaxHeap {
    constructor() {
        this.values = [];
        this.size = 0;
    }

    insert(value) {
        // If no value, do nothing
        if (value === undefined) return;
        // Insert the value, and increment the size of the heap
        this.values.push(value);
        this.size++;
        // Check to see if there is not more than 1 item in the heap
        // If there is only 1 item, there is no need to bubble up
        if (this.size > 1) this._bubbleUp();
        return this.values;
    }

    _bubbleUp() {
        // Grab the most recently added value and its parent
        let currentIndex = this.size - 1;
        let parentIndex = Math.floor((currentIndex - 1) / 2);

        // Swap the new node with its parent until the new node either
        // becomes the root, or is no longer greater than its parent
        while (
            parentIndex >= 0 &&
            this.values[currentIndex] > this.values[parentIndex]
        ) {
            this._swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = Math.floor((currentIndex - 1) / 2);
        }
    }

    // Helper function using object destructuring to swap the elements at two indices
    _swap(index1, index2) {
        [this.values[index1], this.values[index2]] = [
            this.values[index2],
            this.values[index1],
        ];
    }
}

const heap = new MaxHeap();
const values = [17, 2, 36, 100, 7, 1, 19, 25, 3];

for (let val of values) {
    heap.insert(val);
}

console.log("TESt");
