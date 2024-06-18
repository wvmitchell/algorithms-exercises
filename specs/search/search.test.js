// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  // iterate through entire array
  // when you encounter the object with the id you're looking for, return it
  // if you don't encounter it, return null
  for (let obj of array) {
    if (obj.id == id) {
      return obj;
    }
  }
  return void 0;
}

function binarySearch(id, array) {
  // set three pointers: right, mid, and left
  // left starts at 0, mid a array length / 2, and right at array length - 1
  // while left < right
  // if id at mid is the object, return it
  // if the id at mid is greater than id
  // set right to mid
  // if id at mid is less than id
  // set left to mid
  // set mid to left + (right - left) / 2
  // if loop ends without returning a middle, then return null
  let left = 0;
  let mid = Math.floor(array.length / 2);
  let right = array.length - 1;

  while (left < right) {
    let middle = array[mid];
    if (id == middle.id) {
      return middle;
    } else if (id > middle.id) {
      left = mid;
    } else {
      right = midd;
    }
    mid = left + Math.floor((right - left) / 2);
  }

  return void 0;
}

// unit tests
// do not modify the below code
test("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" },
    ]),
  ).toBe(lookingFor);
});

test("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" },
    ]),
  ).toBe(lookingFor);
});
