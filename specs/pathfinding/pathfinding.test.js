// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
    let currentAQueue = [[xA, yA]];
    let currentBQueue = [[xB, yB]];
    const visitedA = new Set();
    const visitedB = new Set();
    let distance = 0;

    while (visitedA.intersection(visitedB).size == 0) {
        const nextAQueue = [];
        const nextBQueue = [];

        // if visitedA or visitedB do not get larger
        // the maze is impossible
        let visitedALen = visitedA.size;
        let visitedBLen = visitedB.size;

        while (currentAQueue.length) {
            let position = currentAQueue.pop();
            visitedA.add(position.toString());
            let nextPositions = validNextPositions(maze, position);
            nextPositions.forEach((p) => {
                if (!visitedA.has(p.toString())) {
                    nextAQueue.push(p);
                }
            });
        }

        while (currentBQueue.length) {
            let position = currentBQueue.pop();
            visitedB.add(position.toString());
            let nextPositions = validNextPositions(maze, position);
            nextPositions.forEach((p) => {
                if (!visitedB.has(p.toString())) {
                    nextBQueue.push(p);
                }
            });
        }

        currentAQueue = nextAQueue;
        currentBQueue = nextBQueue;

        distance += 1;

        if (visitedA.size == visitedALen || visitedB.size == visitedBLen) {
            return -1;
        }
    }

    const overlap = visitedA.intersection(visitedB).size;

    return overlap == 2 ? distance * 2 - 3 : distance * 2 - 2;
}

function validNextPositions(maze, [x, y]) {
    let candidates = [
        [x - 1, y],
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
    ];
    return candidates.filter((candidate) => {
        let [cX, cY] = candidate;
        if (cX < 0 || cY < 0) {
            return false;
        } else if (
            !maze[cY] ||
            maze[cY][cX] === undefined ||
            maze[cY][cX] === 1
        ) {
            return false;
        }
        return true;
    });
}

describe("validNextPositions", () => {
    const maze = [
        [2, 0, 0],
        [0, 2, 0],
        [2, 0, 2],
    ];

    test("it should find the two candidates when in the upper corner", () => {
        const position = [0, 0];
        const expected = [
            [1, 0],
            [0, 1],
        ];
        expect(validNextPositions(maze, position)).toEqual(expected);
    });

    test("it should find the two candidates when in the bottom right corner", () => {
        const position = [2, 2];
        const expected = [
            [1, 2],
            [2, 1],
        ];
        expect(validNextPositions(maze, position)).toEqual(expected);
    });

    test("it should find the two candidates when in the bottom left corner", () => {
        const position = [2, 0];
        const expected = [
            [1, 0],
            [2, 1],
        ];
        expect(validNextPositions(maze, position)).toEqual(expected);
    });

    test("it should find the candidates when in the middle", () => {
        const position = [1, 1];
        const expected = [
            [0, 1],
            [1, 0],
            [2, 1],
            [1, 2],
        ];
        expect(validNextPositions(maze, position)).toEqual(expected);
    });

    test("it should find the candiates when some are blocked by 1s", () => {
        const maze = [
            [0, 1, 0],
            [1, 2, 1],
            [0, 0, 0],
        ];
        const position = [1, 1];
        const expected = [[1, 2]];
        expect(validNextPositions(maze, position)).toEqual(expected);
    });
});

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
    const fourByFour = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 2],
    ];
    it("should solve a 4x4 maze", () => {
        expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
    });

    const sixBySix = [
        [0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0],
    ];
    it("should solve a 6x6 maze", () => {
        expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
    });

    const eightByEight = [
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 2, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 2],
    ];
    it("should solve a 8x8 maze", () => {
        expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(
            16,
        );
    });

    const fifteenByFifteen = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    it("should solve a 15x15 maze", () => {
        expect(
            findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8]),
        ).toEqual(78);
    });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
    const byEachOther = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
    ];
    it("should solve the maze if they're next to each other", () => {
        expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
    });

    const impossible = [
        [0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 2],
    ];
    it("should return -1 when there's no possible path", () => {
        expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
    });
});
