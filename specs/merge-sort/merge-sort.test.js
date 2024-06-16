/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  if (nums.length < 2) {
    return nums;
  }

  let middle = Math.floor(nums.length / 2);
  let left = nums.slice(0, middle);
  let right = nums.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

/**
 *
 * @param {number[]} left - An already sorted array of numbers
 * @param {number[]} right - An already sorted array of numbers
 * @return {number[]} A new sorted array combining left and right
 *
 * @example
 *
 *    merge([1,3], [2,4])
 *
 */
function merge(arr1, arr2) {
  let newArr = [];

  while (arr1.length || arr2.length) {
    if (!arr2.length || arr1[0] < arr2[0]) {
      newArr.push(arr1.shift());
    } else {
      newArr.push(arr2.shift());
    }
  }

  return newArr;
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("merge", function () {
  const numsA = [2, 4, 6, 8, 10];
  const numsB = [1, 3, 5, 7, 9];
  const ans = merge(numsA, numsB);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("merge others", function () {
  const a = [1, 6, 7, 9];
  const b = [2, 3];
  const ans = merge(a, b);
  const expected = [1, 2, 3, 6, 7, 9];
  expect(ans).toEqual(expected);
});
