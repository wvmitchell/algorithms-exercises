/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
    createMaxHeap(array);
    let heapSize = array.length - 1;
    while (heapSize > 0) {
        swap(0, heapSize, array);
        heapify(array, 0, heapSize);
        heapSize--;
    }
};

const createMaxHeap = (array) => {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array, i, array.length);
    }
};

const swap = (index1, index2, array) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
};

const inBounds = (index, heapSize) => {
    return index < heapSize;
};

const heapify = (array, index, heapSize) => {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const element = array[index];
    const leftChild = inBounds(leftIndex, heapSize)
        ? array[leftIndex]
        : undefined;
    const rightChild = inBounds(rightIndex, heapSize)
        ? array[rightIndex]
        : undefined;

    if (element < leftChild && leftChild > rightChild) {
        swap(index, leftIndex, array);
        heapify(array, leftIndex, heapSize);
    } else if (element < rightChild && rightChild > leftChild) {
        swap(index, rightIndex, array);
        heapify(array, rightIndex, heapSize);
    } else if (element < leftChild && !rightChild) {
        swap(index, leftIndex, array);
        heapify(array, leftIndex, heapSize);
    }
};

test("max heap", function () {
    const nums = [1, 3, 5];
    createMaxHeap(nums);
    expect(nums).toEqual([5, 3, 1]);
});

test("max heap again", function () {
    const nums = [4, 3, 1, 6, 8, 10];
    createMaxHeap(nums);
    expect(nums).toEqual([10, 8, 4, 6, 3, 1]);
});

// unit tests
// do not modify the below code
test.only("heap sort", function () {
    const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
    heapSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
