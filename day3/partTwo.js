const { firstWire, secondWire } = require('./input');

const traceNextPath = path => {
  const direction = path.slice(0, 1);
  const numMoves = path.slice(1);
  return [direction, numMoves];
};

const traverseWire = (wire, map, findIntersections = false) => {
  const intersections = [];
  const position = {
    x: 0,
    y: 0,
    steps: 0
  };
  for (path of wire) {
    const [direction, numMoves] = traceNextPath(path);
    let axis = direction === 'L' || direction === 'R' ? 'x' : 'y';
    let reverse = direction === 'D' || direction === 'L';
    for (let i = 0; i < numMoves; i++) {
      position[axis] += reverse ? -1 : 1;
      position.steps++;
      if (findIntersections) {
        if (map[`x${position.x}y${position.y}`]) {
          intersections.push(
            position.steps + map[`x${position.x}y${position.y}`]
          );
        }
      } else {
        map[`x${position.x}y${position.y}`] = position.steps;
      }
    }
  }
  return intersections;
};

const findClosestIntersection = (wire1, wire2) => {
  let wireMap = {};
  let intersections = [];
  intersections = traverseWire(wire1, wireMap, false);
  intersections = traverseWire(wire2, wireMap, true);
  console.log('Answer: ', Math.min(...intersections));
};

findClosestIntersection(firstWire, secondWire);
