/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function radixSort(array) {
  let maxKeyLength = 4;
  let copy = [...array];
  let buckets = [];
  let i = 0;
  let hasBaseMember = false;

  do {
    buckets = [];
    hasBaseMember = false;

    for (num of copy) {
      let strNum = num.toString();
      let length = strNum.length;
      let bucketIndex = strNum[length - i - 1] || 0;

      if (buckets[bucketIndex]) {
        buckets[bucketIndex].push(num);
      } else {
        buckets[bucketIndex] = [num];
      }

      if (length >= i) {
        hasBaseMember = true;
      }
    }

    copy = buckets.flat();
    i++;
  } while (hasBaseMember);

  return copy;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [4, 3, 1];
    const ans = radixSort(nums);
    expect(ans).toEqual([1, 3, 4]);
  });
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    console.log(ans);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
